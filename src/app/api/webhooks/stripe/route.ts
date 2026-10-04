import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe webhook.";
    console.error(`[STRIPE_WEBHOOK_ERROR]: ${message}`);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderNumber = session.metadata?.orderNumber;
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!orderNumber || !paymentIntentId) {
      return new NextResponse(
        "Webhook received but missing orderNumber in metadata",
        { status: 400 },
      );
    }

    try {
      await prisma.order.update({
        where: { orderNumber: orderNumber },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
          stripePaymentIntentId: paymentIntentId,
        },
      });

      console.log(
        `[STRIPE_WEBHOOK_SUCCESS]: Order ${orderNumber} updated to PAID and PROCESSING.`,
      );
    } catch (dbError) {
      console.error(`[DATABASE_UPDATE_ERROR]:`, dbError);
      return new NextResponse("Internal database update failure", {
        status: 500,
      });
    }
  }

  return new NextResponse("Webhook successfully processed", { status: 200 });
}
