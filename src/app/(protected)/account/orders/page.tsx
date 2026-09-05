"use client";

import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";

const orders = [
  {
    id: "ORD-8FK2P9",
    image: "/images/product-vintage-orange-jacket-01.jpg",
    totalItems: 1,
    totalPrice: 89.5,
    date: "July 27, 2026",
    status: "Delivered",
  },
  {
    id: "ORD-4PL9X2",
    image: "/images/shop-minimalist-leather-blazer.jpg",
    totalItems: 2,
    totalPrice: 258.0,
    date: "August 14, 2026",
    status: "Processing",
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-success/10 text-success border border-success/20",
  Processing: "bg-warning/10 text-warning border border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default function OrdersPage() {
  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadCrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Purchase Records" },
          ]}
        />

        <div className="mb-8 border-b border-border pb-4">
          <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            Purchase History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review live fulfillment cycles and access historic invoices.
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-6 rounded-2xl border border-border bg-surface/20 p-5 transition-all duration-300 hover:border-accent/20 hover:shadow-md md:flex-row md:items-center"
            >
              <div className="relative shrink-0 aspect-3/4 w-24 overflow-hidden rounded-xl border border-border bg-surface sm:w-28">
                <Image
                  src={order.image}
                  alt={`Order invoice graphic ${order.id}`}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-bold text-base text-foreground">
                    Invoice {order.id}
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase ${
                      statusStyles[order.status] ||
                      "bg-surface text-muted-foreground"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold tracking-wide uppercase sm:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground">Total Units</p>
                    <p className="mt-1.5 text-sm font-bold text-foreground">
                      {order.totalItems}{" "}
                      {order.totalItems === 1 ? "Item" : "Items"}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Total Price</p>
                    <p className="mt-1.5 text-sm font-bold text-foreground">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-muted-foreground">Logistics Timestamp</p>
                    <p className="mt-1.5 text-sm font-bold text-foreground">
                      {order.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end md:justify-center">
                <Link href={`/account/orders/${order.id}`}>
                  <button className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 bg-surface border border-border text-foreground hover:bg-background hover:text-accent hover:border-accent/40 cursor-pointer active:scale-95 shadow-sm">
                    <FiEye size={16} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FrontEndLayout>
  );
}
