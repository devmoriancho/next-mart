"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/generated/prisma";
import { updateOrderStatus } from "@/server-actions/order/updateOrderStatus";

interface OrderStatusCardProps {
  orderId: number;
  currentStatus: OrderStatus;
}

export default function OrderStatusCard({
  orderId,
  currentStatus,
}: OrderStatusCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isPending, setIsPending] = useState(false);

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const nextStatus = event.target.value as OrderStatus;
    setIsPending(true);

    const result = await updateOrderStatus(orderId, nextStatus);

    if (result.success) {
      setStatus(nextStatus);
      router.refresh();
    } else {
      alert(result.error || "An error occurred while updating status");
      event.target.value = status;
    }

    setIsPending(false);
  }

  return (
    <div className="rounded-2xl border border-border p-6 bg-surface/10">
      <h2 className="text-base font-bold uppercase tracking-wider text-foreground border-b border-border pb-4">
        Fulfillment Management
      </h2>

      <div className="mt-6 space-y-4">
        <label
          htmlFor="order-status-select"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
        >
          Pipeline Status
        </label>

        <div className="relative flex items-center">
          <select
            id="order-status-select"
            disabled={isPending}
            value={status}
            onChange={handleStatusChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent disabled:opacity-60 transition"
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {isPending && (
            <div className="absolute right-10 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
}
