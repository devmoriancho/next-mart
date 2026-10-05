"use client";

import React, { useMemo, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export interface AdminOrder {
  id: number;
  orderNumber: string;
  createdAt: string;
  total: number;
  paymentStatus: string;
  status: string;
  user: {
    name: string;
    email: string;
  };
  _count: {
    items: number;
  };
}

interface AdminOrdersListProps {
  initialOrders: AdminOrder[];
}

const paymentBadgeStyles: Record<string, string> = {
  PAID: "bg-success/10 text-success border border-success/20",
  PENDING: "bg-warning/10 text-warning border border-warning/20",
  FAILED: "bg-destructive/10 text-destructive border border-destructive/20",
  CANCELLED: "bg-destructive/10 text-destructive border border-destructive/20",
};

const deliveryBadgeStyles: Record<string, string> = {
  PROCESSING: "bg-primary/10 text-primary border border-primary/20",
  PENDING: "bg-warning/10 text-warning border border-warning/20",
  SHIPPED: "bg-info/10 text-info border border-info/20",
  DELIVERED: "bg-success/10 text-success border border-success/20",
  CANCELLED: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default function AdminOrdersList({
  initialOrders,
}: AdminOrdersListProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("ALL");

  const filteredOrders = useMemo(
    () =>
      initialOrders.filter((order) => {
        const matchesQuery =
          `${order.orderNumber} ${order.user?.name || ""} ${order.user?.email || ""}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesStatus =
          paymentStatus === "ALL" || order.paymentStatus === paymentStatus;
        return matchesQuery && matchesStatus;
      }),
    [initialOrders, paymentStatus, query],
  );

  return (
    <>
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
            placeholder="Search by order identifier or customer"
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
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="border-b border-border bg-surface/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Order Code</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Fulfillment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border font-medium">
              {filteredOrders.map((order) => {
                const itemsCount = order._count.items;
                const formattedDate = new Date(
                  order.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-surface/20"
                  >
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-foreground">
                        #{order.orderNumber}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                        {formattedDate}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-foreground">
                      <p>{order.user?.name || "Guest Account"}</p>
                      <p className="text-[10px] text-muted-foreground font-normal lowercase">
                        {order.user?.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs text-foreground">
                      {itemsCount} {itemsCount === 1 ? "item" : "items"}
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-foreground">
                      KES {Number(order.total).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          paymentBadgeStyles[order.paymentStatus] ||
                          "bg-surface text-muted-foreground"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          deliveryBadgeStyles[order.status] ||
                          "bg-surface text-muted-foreground"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-background hover:text-accent hover:border-accent/40 transition cursor-pointer active:scale-95 shadow-sm"
                      >
                        <FiEye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
