"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function deleteProducts(productId: string) {
  try {
    await requireAdmin();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId),
      ),
    );

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error("Failed to delete product:", error);

    return {
      success: false,
      message: "Failed to delete product.",
    };
  }
}
