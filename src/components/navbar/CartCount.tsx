"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CartCount() {
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-semibold text-white">
      {totalItems}
    </span>
  );
}
