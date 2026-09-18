import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/server-actions/auth/require-admin";
import { Category, ProductType, Size } from "@/generated/prisma";
import { uploadImages } from "@/lib/cloudinary";
import { prisma } from "@/database/db";
import { productPayloadSchema } from "@/lib/validations/product";
import { z } from "zod";

export async function GET() {
  try {
    await requireAdmin();
    const products = await prisma.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Request failed.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();

    const rawColors = formData.getAll("colors") as string[];
    const colors = rawColors.map((colorStr) => JSON.parse(colorStr));

    const payload = productPayloadSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      category: formData.get("category"),
      productType: formData.get("productType"),
      bestSeller: formData.get("bestSeller") === "true",
      sizes: formData.getAll("sizes"),
      colors,
    });

    const images = formData
      .getAll("images")
      .filter(
        (image): image is File => image instanceof File && image.size > 0,
      );

    const uploadedImages = await uploadImages(images);

    const newProduct = await prisma.product.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        stock: payload.stock,
        category: payload.category as Category,
        productType: payload.productType as ProductType,
        bestSeller: payload.bestSeller,
        images: {
          create: uploadedImages.map((img) => ({
            imageUrl: img.imageUrl,
            publicId: img.publicId,
          })),
        },
        sizes: {
          create: payload.sizes.map((sizeItem) => ({
            size: sizeItem as Size,
          })),
        },
        colors: {
          create: payload.colors.map((colorItem) => ({
            name: colorItem.name,
            value: colorItem.value,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product catalog item published successfully.",
      product: newProduct,
    });
  } catch (error: unknown) {
    console.error("Product listing runtime error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof z.ZodError
            ? error.issues[0]?.message || "Invalid product data."
            : error instanceof Error
              ? error.message
              : "Something went wrong.",
      },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
