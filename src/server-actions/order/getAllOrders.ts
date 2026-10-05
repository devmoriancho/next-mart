"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function getAllOrders() {
  try {
    await requireAdmin();

    const rawOrders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            items: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const orders = rawOrders.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));

    return { success: true, data: orders };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[GET_ALL_ORDERS_ADMIN_ERROR]:", err.message);

    if (err.message === "UNAUTHENTICATED" || err.message === "UNAUTHORIZED") {
      return {
        success: false,
        error: "Access Denied: Admin privileges required",
      };
    }

    return { success: false, error: "Internal Server Error" };
  }
}
