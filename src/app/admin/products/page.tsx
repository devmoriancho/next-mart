"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiPlus, FiSearch } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import Button from "@/components/ui/Button";
import { categoryValues } from "@/lib/validations/product";
import { getProducts } from "@/server-actions/products/getProducts";
import DeleteProductButton from "@/components/layout/DeleteProductButton";

interface AdminProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    async function loadInitialData() {
      try {
        const data = await getProducts();

        if (data && Array.isArray(data)) {
          const mappedProducts = data.map((product) => ({
            id: product.id,
            name: product.name,
            image: product.images?.[0]?.imageUrl ?? "/images/placeholder.jpg",
            category: product.category,
            price: Number(product.price),
            stock: product.stock,
            status: "Active" as const,
          }));
          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error("Failed to resolve product catalog mapping:", err);
      }
    }

    loadInitialData();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = product.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === "ALL" || product.category === category;
        return matchesQuery && matchesCategory;
      }),
    [category, products, query],
  );

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Products
          </h1>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Manage products, prices, stock, and availability.
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

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            aria-label="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none focus:border-accent"
          />
        </label>
        <select
          aria-label="Filter products by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
        >
          <option value="ALL">All categories</option>
          {categoryValues.map((categoryValue) => (
            <option key={categoryValue} value={categoryValue}>
              {categoryValue}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="border-b border-border bg-surface/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border font-medium">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-surface/20"
                >
                  <td className="flex items-center gap-4 px-6 py-4">
                    <div className="relative h-11 w-9 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <span className="truncate max-w-50 text-xs font-bold text-foreground">
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
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-background hover:text-accent transition cursor-pointer shadow-sm"
                    >
                      <FiEdit2 size={14} />
                    </Link>
                    <DeleteProductButton
                      productId={product.id}
                      onDeleted={(deletedId) =>
                        setProducts((current) =>
                          current.filter((product) => product.id !== deletedId),
                        )
                      }
                    />
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
