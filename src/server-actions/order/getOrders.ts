"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function getOrders() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: "Unauthorized" };
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error("[GET_ORDERS_SERVER_ACTION_ERROR]:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
