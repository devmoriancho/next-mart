import React from "react";
import { FiUsers, FiBox, FiClipboard, FiTrendingUp } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import { getDashboardStats } from "@/server-actions/admin/getDashboardStats";
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const response = await getDashboardStats();
  const stats =
    response.success && response.data
      ? response.data
      : { totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 };

  const analyticsSummary = [
    {
      title: "Total Users",
      metricCount: stats.totalUsers,
      description: "Registered customers",
      icon: FiUsers,
    },
    {
      title: "Total Products",
      metricCount: stats.totalProducts,
      description: "Products in your store",
      icon: FiBox,
    },
    {
      title: "Total Orders",
      metricCount: stats.totalOrders,
      description: "Orders placed",
      icon: FiClipboard,
    },
    {
      title: "Total Revenue",
      metricCount: `KES ${stats.totalRevenue.toLocaleString()}`,
      description: "Money from paid orders",
      icon: FiTrendingUp,
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-10 border-b border-border pb-5">
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          Welcome back! Here is a quick look at your store.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsSummary.map((cardData) => {
          const IconComponent = cardData.icon;

          return (
            <div
              key={cardData.title}
              className="rounded-2xl border border-border bg-surface/20 p-6 shadow-sm transition-all duration-300 hover:border-accent/20 hover:bg-surface/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {cardData.title}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <IconComponent size={18} />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                  {cardData.metricCount}
                </p>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                  {cardData.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
