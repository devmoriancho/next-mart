"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PaymentMethod, PaymentStatus } from "@/generated/prisma/client";
import { createOrder } from "./creatOrder";

export interface PlaceOrderInput {
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cartItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }[];
  paymentMethod: PaymentMethod;
}

export async function placeOrder(data: PlaceOrderInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "Please log in first to complete your checkout process.",
      };
    }

    if (!data.cartItems || data.cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty. Cannot process an order with no items.",
      };
    }

    const result = await createOrder({
      userId: session.user.id,
      paymentMethod: data.paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      status: "PENDING",
      shippingAddress: data.shippingAddress,
      cartItems: data.cartItems,
      stripePaymentIntentId: null,
    });

    if (!result.success || !result.order) {
      return {
        success: false,
        message: "Unable to place order. Database transaction failed.",
      };
    }

    return {
      success: true,
      orderNumber: result.order.orderNumber,
      message: "Order placed successfully.",
    };
  } catch (error) {
    console.error("Internal placeOrder execution failure:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to place order.",
    };
  }
}
