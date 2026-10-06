"use server";

import {
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
} from "@/generated/prisma/client";
import { getCurrentUser } from "../auth/getCurrentUser";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { createOrder } from "./creatOrder";

export async function completeStripeOrder(sessionId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { success: false, message: "Please log in first." };
  }

  if (!sessionId) {
    return { success: false, message: "Missing Stripe checkout session." };
  }

  let paymentIntentId: string | undefined;

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (
      session.payment_status !== "paid" ||
      session.metadata?.userId !== currentUser.id ||
      !paymentIntentId
    ) {
      return {
        success: false,
        message: "Stripe payment has not been completed.",
      };
    }

    const existingOrder = await prisma.order.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
      select: { orderNumber: true },
    });

    if (existingOrder) {
      return { success: true, orderNumber: existingOrder.orderNumber };
    }

    const cartItems = JSON.parse(session.metadata?.cartItems || "[]");
    const shippingAddress = JSON.parse(
      session.metadata?.shippingAddress || "{}",
    );

    if (!cartItems.length || !shippingAddress.postalCode) {
      return { success: false, message: "Stripe order data is incomplete." };
    }

    const result = await createOrder({
      userId: currentUser.id,
      paymentMethod: PaymentMethod.STRIPE,
      paymentStatus: PaymentStatus.PAID,
      status: OrderStatus.PROCESSING,
      shippingAddress,
      cartItems,
      stripePaymentIntentId: paymentIntentId,
    });

    return result.success && result.order
      ? { success: true, orderNumber: result.order.orderNumber }
      : { success: false, message: "Unable to save the paid order." };
  } catch (error) {
    if (paymentIntentId) {
      const existingOrder = await prisma.order.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
        select: { orderNumber: true },
      });

      if (existingOrder) {
        return { success: true, orderNumber: existingOrder.orderNumber };
      }
    }

    console.error("Stripe order completion failure:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to complete order.",
    };
  }
}
