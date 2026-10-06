"use server";

import { OrderStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function updateOrderStatus(
  orderId: number,
  newStatus: OrderStatus,
) {
  try {
    await requireAdmin();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    return { success: true, data: updatedOrder };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[UPDATE_ORDER_STATUS_ERROR]:", err.message);

    if (err.message === "UNAUTHENTICATED" || err.message === "UNAUTHORIZED") {
      return {
        success: false,
        error: "Access Denied: Admin privileges required",
      };
    }

    return { success: false, error: "Failed to update order status" };
  }
}
