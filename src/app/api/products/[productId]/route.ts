import { NextResponse } from "next/server";
import { Category, ProductType, Size } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { deleteImages } from "@/lib/cloudinary";
import { productPayloadSchema } from "@/lib/validations/product";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

type ProductRouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(_request: Request, { params }: ProductRouteContext) {
  try {
    await requireAdmin();
    const { productId } = await params;
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true, sizes: true, colors: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ product });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: ProductRouteContext) {
  try {
    await requireAdmin();
    const { productId } = await params;
    const payload = productPayloadSchema.parse(await request.json());

    const product = await prisma.$transaction(async (transaction) => {
      await transaction.productSize.deleteMany({ where: { productId } });
      await transaction.productColor.deleteMany({ where: { productId } });

      return transaction.product.update({
        where: { id: productId },
        data: {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          stock: payload.stock,
          category: payload.category as Category,
          productType: payload.productType as ProductType,
          bestSeller: payload.bestSeller,
          sizes: {
            create: payload.sizes.map((size) => ({ size: size as Size })),
          },
          colors: {
            create: payload.colors,
          },
        },
        include: { images: true, sizes: true, colors: true },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: ProductRouteContext,
) {
  try {
    await requireAdmin();
    const { productId } = await params;
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }

    await prisma.product.delete({ where: { id: productId } });
    await deleteImages(product.images.map((image) => image.publicId));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
  return NextResponse.json(
    {
      message:
        error instanceof z.ZodError
          ? error.issues[0]?.message || "Invalid product data."
          : error instanceof Error
            ? error.message
            : "Request failed.",
    },
    { status: error instanceof z.ZodError ? 400 : 500 },
  );
}
