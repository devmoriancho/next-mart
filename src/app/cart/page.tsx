"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingThreshold = 200;
  const shippingCost =
    subtotal > shippingThreshold || subtotal === 0 ? 0 : 15.0;
  const taxCoefficient = 0.08;
  const taxCost = subtotal * taxCoefficient;
  const grossTotal = subtotal + shippingCost + taxCost;

  if (!hasHydrated) {
    return (
      <FrontEndLayout>
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center animate-pulse">
          <div className="h-8 w-48 bg-surface rounded-xl mx-auto mb-4" />
          <div className="h-4 w-64 bg-surface rounded-lg mx-auto" />
        </section>
      </FrontEndLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <FrontEndLayout>
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-border text-muted-foreground mb-6 shadow-sm">
            <FiShoppingBag size={24} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto font-medium">
            Browse our products and find something you like.
          </p>
          <div className="mt-8">
            <Link href="/shop">
              <Button leftIcon={<FiArrowRight size={16} />}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </section>
      </FrontEndLayout>
    );
  }

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-border pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Shopping Bag
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-medium">
            Review your items ({totalItemsCount}{" "}
            {totalItemsCount === 1 ? "item" : "items"}) before checkout.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-surface/20 p-5 sm:flex-row sm:items-center transition-all duration-300 hover:border-accent/10"
              >
                <div className="relative aspect-3/4 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-surface sm:w-28">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-w-7xl) 120px, 100px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-muted-foreground uppercase">
                      <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                        Size: {item.selectedSize}
                      </span>
                      <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                        Color: {item.selectedColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between sm:justify-end">
                    <div className="flex items-center rounded-xl border border-border bg-background p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.cartKey)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition cursor-pointer active:scale-90"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.cartKey)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition cursor-pointer active:scale-90"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="text-base font-extrabold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartKey)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-destructive hover:bg-destructive/10 hover:border-destructive/20 transition cursor-pointer active:scale-95 shadow-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-surface/10 p-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-success uppercase font-bold text-xs tracking-wider">
                      Free
                    </span>
                  ) : (
                    <span className="text-foreground">
                      ${shippingCost.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-foreground">${taxCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-border pt-4 text-lg font-black text-foreground">
                  <span>Total</span>
                  <span className="text-accent">${grossTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8">
                <Button fullWidth className="shadow-lg shadow-accent/10">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
