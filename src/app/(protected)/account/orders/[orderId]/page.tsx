"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiPackage, FiMapPin } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Button from "@/components/ui/Button";
import BreadCrumb from "@/components/ui/BreadCrumb";

const order = {
  id: "ORD-8FK2P9",
  createdAt: "July 27, 2026",
  status: "Pending",
  paymentMethod: "M-Pesa Checkout Gateway",
  paymentStatus: "Settled Verified",

  subtotal: 89.5,
  shipping: 0,
  tax: 5.5,
  total: 95.0,

  address: {
    firstName: "Vincent",
    lastName: "Parkolwa",
    phone: "+254 701 234 567",
    street: "Wood Avenue Towers, Box 45",
    city: "Kilimani District",
    state: "Nairobi",
    country: "Kenya",
  },
  items: [
    {
      id: "prod-02",
      name: "Vintage Canvas Utility Outerwear",
      image: "/images/product-vintage-orange-jacket-01.jpg",
      price: 89.5,
      quantity: 1,
      size: "M",
      color: "Russet Orange",
    },
  ],
};

export default function OrderPage() {
  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadCrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Orders", href: "/account/orders" },
            { label: order.id },
          ]}
        />

        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-surface/20 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/account/orders">
              <Button
                variant="hover"
                className="mb-4 text-xs h-9"
                leftIcon={<FiArrowLeft size={14} />}
              >
                Back to Records
              </Button>
            </Link>

            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Manifest {order.id}
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Logged to pipeline on {order.createdAt}
            </p>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-warning/10 border border-warning/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-warning">
              {order.status}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="text-accent">
                  <FiPackage size={18} />
                </div>
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  Consignment Items
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-5 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center"
                  >
                    <div className="relative aspect-3/4 w-24 shrink-0 overflow-hidden rounded-xl border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          {item.name}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground uppercase">
                          <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                            Size: {item.size}
                          </span>
                          <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                            Hue: {item.color}
                          </span>
                          <span className="rounded-lg bg-surface px-2.5 py-1 border border-border">
                            Units: {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-lg font-extrabold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
                Financial Ledger
              </h2>

              <div className="mt-6 space-y-3.5 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal Baseline</span>
                  <span className="text-foreground">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Logistics / Freight</span>
                  <span className="text-success uppercase font-bold text-xs tracking-wider">
                    Free Route
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sartorial Duty Tax</span>
                  <span className="text-foreground">
                    ${order.tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-border pt-4 text-lg font-black text-foreground">
                  <span>Gross Remittance</span>
                  <span className="text-accent">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-6 bg-surface/10">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="text-accent">
                  <FiMapPin size={18} />
                </div>
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  Delivery Destination
                </h2>
              </div>

              <div className="mt-5 space-y-1 text-sm font-medium text-muted-foreground">
                <p className="font-bold text-foreground">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-xs">{order.address.phone}</p>
                <p className="mt-2 text-foreground/80">
                  {order.address.street}
                </p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider mt-1">
                  {order.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
