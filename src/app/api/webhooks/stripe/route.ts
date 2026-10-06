import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { prisma } from "@/lib/db";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/generated/prisma/client";
import { createOrder } from "@/server-actions/order/creatOrder";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Stripe webhook configuration is missing", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe webhook.";
    console.error(`[STRIPE_WEBHOOK_ERROR]: ${message}`);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;
    const metadata = session.metadata;

    if (
      !paymentIntentId ||
      !metadata?.userId ||
      !metadata.cartItems ||
      !metadata.shippingAddress
    ) {
      return new NextResponse(
        "Webhook received with incomplete order metadata",
        { status: 400 },
      );
    }

    try {
      const existingOrder = await prisma.order.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
        select: { orderNumber: true },
      });

      if (existingOrder) {
        return new NextResponse("Webhook already processed", { status: 200 });
      }

      const cartItems = JSON.parse(metadata.cartItems);
      const shippingAddress = JSON.parse(metadata.shippingAddress);

      const result = await createOrder({
        userId: metadata.userId,
        paymentMethod: PaymentMethod.STRIPE,
        paymentStatus: PaymentStatus.PAID,
        status: OrderStatus.PROCESSING,
        cartItems,
        shippingAddress,
        stripePaymentIntentId: paymentIntentId,
      });

      console.log(
        `[STRIPE_WEBHOOK_SUCCESS]: Order ${result.order?.orderNumber} created and marked PAID.`,
      );
    } catch (dbError) {
      const existingOrder = await prisma.order.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
        select: { orderNumber: true },
      });

      if (existingOrder) {
        return new NextResponse("Webhook already processed", { status: 200 });
      }

      console.error(`[DATABASE_UPDATE_ERROR]:`, dbError);
      return new NextResponse("Internal database update failure", {
        status: 500,
      });
    }
  }

  return new NextResponse("Webhook successfully processed", { status: 200 });
}
