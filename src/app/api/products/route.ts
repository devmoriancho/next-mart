import { NextResponse } from "next/server";
import { Category, ProductType, Size } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { uploadImages } from "@/lib/services/uploadImages";
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
    const colors = (formData.getAll("colors") as string[]).map((color) =>
      JSON.parse(color),
    );
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

    const product = await prisma.product.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        stock: payload.stock,
        category: payload.category as Category,
        productType: payload.productType as ProductType,
        bestSeller: payload.bestSeller,
        images: {
          create: uploadedImages.map((image) => ({
            imageUrl: image.imageUrl,
            publicId: image.publicId,
          })),
        },
        sizes: {
          create: payload.sizes.map((size) => ({ size: size as Size })),
        },
        colors: {
          create: payload.colors,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product catalog item published successfully.",
      product,
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