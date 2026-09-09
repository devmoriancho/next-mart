"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiLock } from "react-icons/fi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Input from "@/components/ui/Input";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";
import { dummyCartItems } from "@/constants/dummyProducts";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export default function CheckoutPage() {
  const [cartItems] = useState(dummyCartItems);
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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 200 || subtotal === 0 ? 0 : 15.0;
  const taxCost = subtotal * 0.08;
  const grossTotal = subtotal + shippingCost + taxCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
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
            <FiLock size={14} /> SSL Encrypted Gateway
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
              <Elements stripe={stripePromise}>
                <StripePaymentForm amount={grossTotal} formData={formData} />
              </Elements>
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
                    key={item.id}
                    className="flex gap-4 items-center text-sm"
                  >
                    <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-xs truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-muted-foreground text-[11px] font-semibold mt-0.5">
                        QTY: {item.quantity} · SIZE: {item.selectedSize}
                      </p>
                    </div>
                    <p className="font-extrabold text-foreground text-xs">
                      ${(item.product.price * item.quantity).toFixed(2)}
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
                  <span>Tax</span>
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
