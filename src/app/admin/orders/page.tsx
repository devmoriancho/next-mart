import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminOrdersList from "@/components/admin/AdminOrdersList";
import { getAllOrders } from "@/server-actions/order/getAllOrders";

export default async function AdminOrdersPage() {
  const response = await getAllOrders();
  const orders = response.success && response.data ? response.data : [];

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

      <AdminOrdersList initialOrders={orders} />
    </AdminLayout>
  );
}
