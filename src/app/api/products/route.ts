import { NextResponse } from "next/server";
import { Category, ProductType, Size } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { uploadImages } from "@/lib/services/uploadImages";
import { productPayloadSchema } from "@/lib/validations/product";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

async function rollbackCloudinaryImages(publicIds: string[]) {
  if (publicIds.length === 0) return;
  try {
    await Promise.all(publicIds.map((id) => cloudinary.uploader.destroy(id)));
  } catch (rollbackError) {
    console.error(
      "Critical: Failed to clean up orphaned assets during database rollback:",
      rollbackError,
    );
  }
}

export async function GET() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHENTICATED") {
        return NextResponse.json(
          { success: false, message: "Authentication required." },
          { status: 401 },
        );
      }
      if (error.message === "UNAUTHORIZED") {
        return NextResponse.json(
          {
            success: false,
            message: "Access denied. Administrative rights required.",
          },
          { status: 403 },
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Request failed.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let uploadedImages: { publicId: string; imageUrl: string }[] = [];

  try {
    await requireAdmin();

    const formData = await request.formData();

    const rawColors = formData.getAll("colors") as string[];
    let parsedColors: { name: string; value: string }[] = [];

    try {
      parsedColors = rawColors.map((colorStr) => JSON.parse(colorStr));
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid color array serialization format.",
        },
        { status: 400 },
      );
    }

    const payload = productPayloadSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      category: formData.get("category"),
      productType: formData.get("productType"),
      bestSeller: formData.get("bestSeller") === "true",
      sizes: formData.getAll("sizes"),
      colors: parsedColors,
    });

    const rawImages = formData.getAll("images");
    const validImages = rawImages.filter(
      (image): image is File => image instanceof File && image.size > 0,
    );

    if (validImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one product image asset is required.",
        },
        { status: 400 },
      );
    }

    uploadedImages = await uploadImages(validImages);

    try {
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
            create: uploadedImages.map((img) => ({
              imageUrl: img.imageUrl,
              publicId: img.publicId,
            })),
          },
          sizes: {
            create: payload.sizes.map((sz) => ({ size: sz as Size })),
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
    } catch (databaseError) {
      const targetIds = uploadedImages.map((img) => img.publicId);
      await rollbackCloudinaryImages(targetIds);
      throw databaseError;
    }
  } catch (error: unknown) {
    console.error("Product listing runtime error:", error);

    if (error instanceof Error) {
      if (error.message === "UNAUTHENTICATED") {
        return NextResponse.json(
          { success: false, message: "Authentication required." },
          { status: 401 },
        );
      }
      if (error.message === "UNAUTHORIZED") {
        return NextResponse.json(
          {
            success: false,
            message: "Access denied. Administrative rights required.",
          },
          { status: 403 },
        );
      }
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.issues?.[0]?.message ||
            "Invalid product data structure validation.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
