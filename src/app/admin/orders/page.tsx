"use client";

import React from "react";
import { FiEye } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminOrdersPage() {
  const adminOrdersList = [
    {
      id: "ORD-8FK2P9",
      date: "July 27, 2026",
      customer: "Vincent M. Parkolwa",
      itemsCount: 1,
      totalPrice: 95.0,
      paymentStatus: "PAID",
      deliveryStatus: "PENDING",
    },
    {
      id: "ORD-4PL9X2",
      date: "August 14, 2026",
      customer: "Jane Doe",
      itemsCount: 2,
      totalPrice: 258.0,
      paymentStatus: "PAID",
      deliveryStatus: "SHIPPED",
    },
    {
      id: "ORD-9TR3W1",
      date: "August 29, 2026",
      customer: "John Smith",
      itemsCount: 3,
      totalPrice: 184.2,
      paymentStatus: "PENDING",
      deliveryStatus: "PENDING",
    },
  ];

  const paymentBadgeStyles: Record<string, string> = {
    PAID: "bg-success/10 text-success border border-success/20",
    PENDING: "bg-warning/10 text-warning border border-warning/20",
  };

  const deliveryBadgeStyles: Record<string, string> = {
    SHIPPED: "bg-primary/10 text-primary border border-primary/20",
    PENDING: "bg-warning/10 text-warning border border-warning/20",
    CANCELLED:
      "bg-destructive/10 text-destructive border border-destructive/20",
  };

  return (
    <AdminLayout>
      <div className="mb-10 border-b border-border pb-5">
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Customer Orders
        </h1>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          Monitor fulfillment pipelines, verify remittance state codes, and
          access detailed invoices.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="border-b border-border bg-surface/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Invoice Reference</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Units Purchased</th>
                <th className="px-6 py-4">Gross Total</th>
                <th className="px-6 py-4">Settlement State</th>
                <th className="px-6 py-4">Fulfillment Cycle</th>
                <th className="px-6 py-4 text-right">Invoice Sheet</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border font-medium">
              {adminOrdersList.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-surface/20"
                >
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-foreground">
                      {order.id}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                      {order.date}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-xs font-bold text-foreground">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 text-xs text-foreground">
                    {order.itemsCount}{" "}
                    {order.itemsCount === 1 ? "item" : "items"}
                  </td>

                  <td className="px-6 py-4 text-xs font-bold text-foreground">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        paymentBadgeStyles[order.paymentStatus]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        deliveryBadgeStyles[order.deliveryStatus]
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        console.log(`Inspecting order sheet: ${order.id}`)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-background hover:text-accent hover:border-accent/40 transition cursor-pointer active:scale-95 shadow-sm"
                    >
                      <FiEye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
