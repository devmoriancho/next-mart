import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

export async function getProducts() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
