"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Input from "@/components/ui/Input";
import CodPaymentForm from "@/components/checkout/CodPaymentForm";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/server-actions/order/placeOrder";

export default function CheckoutPageComponent() {
  const router = useRouter();
  const { cartItems, clearCart } = useCartStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal: "",
  });

  useEffect(() => {
    useCartStore.persist.rehydrate();
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingThreshold = 200;
  const shippingCost =
    subtotal > shippingThreshold || subtotal === 0 ? 0 : 15.0;
  const taxCost = subtotal * 0.05;
  const grossTotal = subtotal + shippingCost + taxCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!hasHydrated) {
    return (
      <FrontEndLayout>
        <section className="mx-auto max-w-7xl px-4 py-24 text-center animate-pulse">
          <div className="h-8 w-48 bg-surface rounded-xl mx-auto mb-4" />
          <div className="h-4 w-64 bg-surface rounded-lg mx-auto" />
        </section>
      </FrontEndLayout>
    );
  }
  const handlePlaceCodOrder = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postal
    ) {
      toast.error("Please fill out all shipping address fields first.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
        price: item.price,
      }));

      const result = await placeOrder({
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postal,
          country: "Kenya",
        },
        cartItems: formattedCartItems,
        paymentMethod: "CASH_ON_DELIVERY",
      });

      if (!result.success) {
        toast.error(result.message || "Unable to place order.");
        return;
      }

      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/account/orders/${result.orderNumber}`);
    } catch (error) {
      console.error("Checkout submission failure:", error);
      toast.error("An unexpected error occurred while saving your order.");
    } finally {
      setIsSubmitting(false);
    }

    // continue to stripe
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-border pb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
            >
              <FiChevronLeft size={14} /> Back to Cart
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-2 sm:text-4xl">
              Secure Checkout
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-success/10 border border-success/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-success w-fit">
            <FiLock size={14} /> Cash on Delivery Protection
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface/20 p-6">
              <h2 className="text-base font-bold tracking-tight text-foreground mb-6 uppercase">
                1. Shipping Address
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  placeholder="john@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  placeholder="+254 712 345 678"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    name="address"
                    placeholder="123 Main St"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  label="City"
                  name="city"
                  placeholder="Nairobi"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="State / County"
                  name="state"
                  placeholder="Nairobi"
                  type="text"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Postal Code"
                  name="postal"
                  placeholder="00100"
                  type="text"
                  value={formData.postal}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Country"
                  placeholder="Kenya"
                  type="text"
                  defaultValue="Kenya"
                  readOnly
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface/20 p-6">
              <h2 className="text-base font-bold tracking-tight text-foreground mb-6 uppercase">
                2. Payment Method
              </h2>
              <CodPaymentForm
                amount={grossTotal}
                isSubmitting={isSubmitting}
                onConfirm={handlePlaceCodOrder}
              />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-surface/10 p-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
                Order Summary
              </h2>

              <div className="mt-6 border-b border-border pb-5 space-y-4 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex gap-4 items-center text-sm"
                  >
                    <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-xs truncate">
                        {item.name}
                      </h4>
                      <p className="text-muted-foreground text-[11px] font-semibold mt-0.5">
                        QTY: {item.quantity} · SIZE: {item.selectedSize}
                      </p>
                    </div>
                    <p className="font-extrabold text-foreground text-xs">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

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
                  <span>Tax (5%)</span>
                  <span className="text-foreground">${taxCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-base font-black text-foreground">
                  <span>Total</span>
                  <span className="text-accent">${grossTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
