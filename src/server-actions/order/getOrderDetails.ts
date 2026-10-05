"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function getOrderDetails(orderNumber: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    if (!orderNumber.trim()) {
      return { success: false, error: "Invalid Order Number" };
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        address: true,
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    if (order.userId !== session.user.id) {
      return { success: false, error: "Access Denied" };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error("[GET_ORDER_DETAILS_ERROR]:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
