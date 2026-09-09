"use client";

import React from "react";
import { FiUsers, FiBox, FiClipboard } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminDashboardPage() {
  const analyticsSummary = [
    {
      title: "Total Users",
      metricCount: 3,
      description: "Registered customer profiles",
      icon: FiUsers,
    },
    {
      title: "Total Products",
      metricCount: 11,
      description: "Active inventory tracking items",
      icon: FiBox,
    },
    {
      title: "Total Orders",
      metricCount: 5,
      description: "Historical transaction checkout logs",
      icon: FiClipboard,
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-10 border-b border-border pb-5">
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          Welcome back! Here is a summary baseline of your platform operations.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-3xl font-black tracking-tight text-foreground">
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
