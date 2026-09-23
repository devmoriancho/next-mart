"use server";

import { Category, ProductType } from "@/generated/prisma";
import { prisma } from "@/lib/db";

interface GetProductParams {
  categories?: Category[];
  productTypes?: ProductType[];
  sort?: "low-high" | "high-low" | "newest" | "oldest";
}

export async function getShopProducts({
  categories = [],
  productTypes = [],
  sort = "newest",
}: GetProductParams) {
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(categories.length > 0 && {
          category: {
            in: categories,
          },
        }),

        ...(productTypes.length > 0 && {
          productType: {
            in: productTypes,
          },
        }),
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
      },

      orderBy:
        sort === "low-high"
          ? { price: "asc" }
          : sort === "high-low"
            ? { price: "desc" }
            : sort === "oldest"
              ? { createdAt: "asc" }
              : { createdAt: "desc" },
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } catch (error) {
    console.error("Failed to fetch shop products:", error);

    return [];
  }
}
