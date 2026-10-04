"use server";

import { prisma } from "@/lib/db";

export async function checkOrderStatus(orderNumber: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      select: { paymentStatus: true, total: true },
    });
    return order;
  } catch (error) {
    console.error("Failed to fetch order status:", error);
    return null;
  }
}
