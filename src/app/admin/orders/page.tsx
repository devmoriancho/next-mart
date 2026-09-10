"use client";

import React, { useMemo, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import { adminOrders } from "@/constants/adminData";

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("ALL");

  const filteredOrders = useMemo(
    () =>
      adminOrders.filter((order) => {
        const matchesQuery = `${order.id} ${order.customer}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus =
          paymentStatus === "ALL" || order.paymentStatus === paymentStatus;
        return matchesQuery && matchesStatus;
      }),
    [paymentStatus, query],
  );

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
          Review customer orders, payment status, and delivery progress.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            aria-label="Search orders"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by order ID or customer"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-accent"
          />
        </label>
        <select
          aria-label="Filter orders by payment status"
          value={paymentStatus}
          onChange={(event) => setPaymentStatus(event.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
        >
          <option value="ALL">All payments</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="border-b border-border bg-surface/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border font-medium">
              {filteredOrders.map((order) => (
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
