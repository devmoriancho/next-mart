"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function getDashboardStats() {
  try {
    await requireAdmin();
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
    ]);

    const revenueAggregate = await prisma.order.aggregate({
      where: {
        paymentStatus: "PAID",
      },
      _sum: {
        total: true,
      },
    });

    const totalRevenue = Number(revenueAggregate._sum.total || 0);
    return {
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[GET_DASHBOARD_STATS_ERROR]:", err.message);

    if (err.message === "UNAUTHENTICATED" || err.message === "UNAUTHORIZED") {
      return {
        success: false,
        error: "Access Denied: Admin privileges required",
      };
    }

    return { success: false, error: "Internal Server Error" };
  }
}
