"use client";

import React from "react";
import Link from "next/link";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import Button from "@/components/ui/Button";

export default function AdminProductsPage() {
  const adminProductsList = [
    {
      id: "prod-01",
      name: "Minimalist Leather Blazer",
      image: "/images/shop-minimalist-leather-blazer.jpg",
      category: "MINIMALIST",
      price: 129.0,
      stock: 45,
      status: "Active",
    },
    {
      id: "prod-02",
      name: "Vintage Canvas Utility Outerwear",
      image: "/images/product-vintage-orange-jacket-01.jpg",
      category: "STREETWEAR",
      price: 89.5,
      stock: 28,
      status: "Active",
    },
    {
      id: "prod-03",
      name: "Casual Knitwear Fall Sweater",
      image: "/images/shop-casual-knitwear-fall.jpg",
      category: "MINIMALIST",
      price: 64.0,
      stock: 60,
      status: "Active",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Inventory Profiles
          </h1>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Manage your catalog baseline, monitor item stock metrics, and handle
            items.
          </p>
        </div>

        <Link href="/admin/products/create">
          <Button
            leftIcon={<FiPlus size={16} />}
            className="shadow-md shadow-primary/5"
          >
            Add Product
          </Button>
        </Link>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="border-b border-border bg-surface/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Product Target</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4">Stock Index</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border font-medium">
              {adminProductsList.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-surface/20"
                >
                  <td className="flex items-center gap-4 px-6 py-4">
                    <div className="relative h-11 w-9 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="truncate max-w-[200px] text-xs font-bold text-foreground">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-semibold text-muted-foreground tracking-wide">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-xs font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-xs text-foreground">
                    {product.stock} units
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success border border-success/20">
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        console.log(`Deleting product: ${product.id}`)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-destructive hover:bg-destructive/10 hover:border-destructive/20 transition cursor-pointer active:scale-95 shadow-sm"
                    >
                      <FiTrash2 size={14} />
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
