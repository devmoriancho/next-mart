"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBox,
  FiPlusCircle,
  FiShoppingBag,
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: FiGrid },
    { label: "Products", href: "/admin/products", icon: FiBox },
    {
      label: "Create Product",
      href: "/admin/products/create",
      icon: FiPlusCircle,
    },
    { label: "Orders", href: "/admin/orders", icon: FiShoppingBag },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-surface/30 px-4 py-6">
        {/* Panel Brand Title */}
        <div className="mb-8 px-2">
          <h2 className="text-sm font-black uppercase tracking-widest text-accent">
            Admin Panel.
          </h2>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/5"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-foreground cursor-pointer transition-all"
          >
            <FiExternalLink size={18} className="shrink-0" />
            <span>View Shop</span>
          </Link>

          <button
            onClick={() => console.log("Logging out admin...")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-destructive hover:bg-destructive/10 cursor-pointer transition-all"
          >
            <FiLogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 px-8 py-10 lg:px-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
