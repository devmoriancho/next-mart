"use server";

import { prisma } from "@/lib/db";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/generated/prisma/client";

export interface CreateOrderInput {
  userId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status?: OrderStatus;
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cartItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  stripePaymentIntentId?: string | null;
}

function generateOrderNumber(): string {
  const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-2026-${randomString}`;
}

export async function createOrder(data: CreateOrderInput) {
  try {
    const productIds = [
      ...new Set(data.cartItems.map((item) => item.productId)),
    ];

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== productIds.length) {
      throw new Error("One or more products in your cart no longer exist.");
    }

    let subtotal = 0;
    const orderItemsData: {
      productId: string;
      quantity: number;
      price: number;
      size: string;
      color: string;
    }[] = [];

    for (const item of data.cartItems) {
      const dbProduct = products.find((p) => p.id === item.productId);

      if (!dbProduct) {
        throw new Error("Product not found in the database catalog.");
      }

      if (dbProduct.stock < item.quantity) {
        throw new Error(`Product "${dbProduct.name}" is out of stock.`);
      }

      const itemPrice = Number(dbProduct.price);
      subtotal += itemPrice * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: itemPrice,
        size: item.size,
        color: item.color,
      });
    }

    const shippingCost = subtotal > 200 || subtotal === 0 ? 0 : 15.0;
    const taxCost = subtotal * 0.05;
    const grossTotal = subtotal + shippingCost + taxCost;
    const orderNumber = generateOrderNumber();

    const finalizedOrder = await prisma.$transaction(async (tx) => {
      let addressRecord = await tx.address.findFirst({
        where: {
          userId: data.userId,
          isDefault: true,
        },
      });

      if (!addressRecord) {
        addressRecord = await tx.address.create({
          data: {
            userId: data.userId,
            firstName: data.shippingAddress.firstName,
            lastName: data.shippingAddress.lastName,
            phone: data.shippingAddress.phone,
            street: data.shippingAddress.street,
            city: data.shippingAddress.city,
            state: data.shippingAddress.state,
            postalCode: data.shippingAddress.postalCode,
            isDefault: true,
          },
        });
      }

      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      const newOrder = await tx.order.create({
        data: {
          orderNumber: orderNumber,
          userId: data.userId,
          addressId: addressRecord.id,
          subtotal,
          shipping: shippingCost,
          tax: taxCost,
          total: grossTotal,
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentStatus,
          status: data.status || OrderStatus.PENDING,
          stripePaymentIntentId: data.stripePaymentIntentId || null,
          items: {
            create: orderItemsData.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              size: item.size,
              color: item.color,
            })),
          },
        },
      });

      return newOrder;
    });

    return {
      success: true,
      order: finalizedOrder,
    };
  } catch (error) {
    console.error("Internal createOrder transaction failure:", error);
    throw error;
  }
}
