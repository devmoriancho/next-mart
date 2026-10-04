"use server";

import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { calculateCheckoutTotals } from "@/constants/checkout";
import { getCurrentUser } from "../auth/getCurrentUser";

interface CreateStripeCheckoutSessionInput {
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
  }[];
}

export async function createStripeCheckoutSession(
  data: CreateStripeCheckoutSessionInput,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "please login first",
      };
    }

    if (data.cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
      };
    }

    const productIds = [
      ...new Set(data.cartItems.map((item) => item.productId)),
    ];

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: { take: 1 } },
    });

    if (products.length !== productIds.length) {
      return {
        success: false,
        message: "One or more products no longer exist.",
      };
    }

    const productLineItems = data.cartItems.map((item) => {
      const product = products.find(({ id }) => id === item.productId);

      if (!product) {
        throw new Error("Product not found in the database catalog.");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Product "${product.name}" is out of stock.`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.images[0]?.imageUrl
              ? [product.images[0].imageUrl]
              : undefined,
          },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: item.quantity,
      };
    });

    const subtotal =
      productLineItems.reduce(
        (total, item) =>
          total + (item.price_data.unit_amount ?? 0) * (item.quantity ?? 0),
        0,
      ) / 100;
    const totals = calculateCheckoutTotals(subtotal);
    const lineItems = [
      ...productLineItems,
      ...(totals.shipping > 0
        ? [
            {
              price_data: {
                currency: (process.env.STRIPE_CURRENCY || "usd").toLowerCase(),
                product_data: { name: "Shipping" },
                unit_amount: Math.round(totals.shipping * 100),
              },
              quantity: 1,
            },
          ]
        : []),
      ...(totals.tax > 0
        ? [
            {
              price_data: {
                currency: (process.env.STRIPE_CURRENCY || "usd").toLowerCase(),
                product_data: { name: "Tax" },
                unit_amount: Math.round(totals.tax * 100),
              },
              quantity: 1,
            },
          ]
        : []),
    ];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not configured.");
    }
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: currentUser.email,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        userId: currentUser.id,
        cartItems: JSON.stringify(data.cartItems),
        shippingAddress: JSON.stringify({
          ...data.shippingAddress,
          email: currentUser.email,
        }),
      },
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to start checkout.",
    };
  }
}
