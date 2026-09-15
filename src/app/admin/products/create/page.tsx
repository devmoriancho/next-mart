"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiUpload } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CreateProductPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [isBestSeller, setIsBestSeller] = useState(false);

  const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

  const colorsList = [
    { name: "Black", value: "#121214" },
    { name: "White", value: "#ffffff" },
    { name: "Gray", value: "#64748b" },
    { name: "Navy", value: "#1e3a8a" },
    { name: "Brown", value: "#8b5a2b" },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new inventory payload...");
  };

  return (
    <AdminLayout>
      <div className="mb-10 border-b border-border pb-5">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors mb-3"
        >
          <FiChevronLeft size={14} /> Back to Inventory
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Add New Product
        </h1>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          Upload new clothing pieces into your platform warehouse data catalogs.
        </p>
      </div>

      <form onSubmit={handleCreateSubmit} className="space-y-6 max-w-4xl">
        {/* Block 1: Product Gallery Upload Zones */}
        <div className="rounded-2xl border border-border bg-surface/20 p-6">
          <h3 className="text-xs font-bold tracking-wider text-foreground uppercase mb-1">
            Product Images
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Upload between 1 and 4 product catalog asset views.
          </p>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex aspect-3/4 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 hover:bg-surface/30 hover:border-accent/40 transition cursor-pointer p-4 text-center group"
              >
                <FiUpload
                  size={18}
                  className="text-muted-foreground group-hover:text-accent transition-colors"
                />
                <span className="mt-2 text-[10px] font-bold text-muted-foreground tracking-wide uppercase group-hover:text-foreground">
                  + Upload
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-5">
          <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3">
            Product Core Meta Data
          </h3>

          <Input
            label="Product Title Name"
            placeholder="e.g. Vintage Canvas Utility Outerwear"
            type="text"
            required
          />

          <Input
            label="Product Profile Description"
            variant="textarea"
            placeholder="Describe your garment details, stitching patterns, and material properties thoroughly..."
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3">
              Pricing & Warehouse Stock
            </h3>
            <Input
              label="Retail Base Price ($)"
              placeholder="89.50"
              type="number"
              step="0.01"
              required
            />
            <Input
              label="Stock Count Quantity"
              placeholder="25"
              type="number"
              required
            />
          </div>

          <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3">
              Classification Parameters
            </h3>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Target Collection Segment
              </label>
              <select className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 mt-1.5 text-sm font-medium text-foreground outline-none focus:border-accent cursor-pointer">
                <option value="STREETWEAR">Streetwear Line</option>
                <option value="MINIMALIST">Minimalist Clean</option>
                <option value="ACCESSORIES">Accessories Pack</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Product Segment Type
              </label>
              <select className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 mt-1.5 text-sm font-medium text-foreground outline-none focus:border-accent cursor-pointer">
                <option value="OUTERWEAR">Outerwear / Jackets</option>
                <option value="APPAREL">Apparel / Tops</option>
                <option value="KNITWEAR">Knitwear / Sweaters</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/20 p-6">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3 mb-4">
              Available Sizes
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 w-11 items-center justify-center rounded-lg border text-xs font-bold tracking-wider transition cursor-pointer hover:border-accent ${
                    selectedSize === size
                      ? "border-accent bg-primary text-primary-foreground"
                      : "border-border text-foreground bg-background/40"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/20 p-6">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3 mb-4">
              Available Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorsList.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold tracking-wide transition cursor-pointer ${
                    selectedColor === color.name
                      ? "border-accent ring-2 ring-accent/30 bg-background/50"
                      : "border-border text-muted-foreground bg-background/10"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-black/5"
                    style={{ backgroundColor: color.value }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/20 p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-foreground">
              Catalog Promotion Highlight
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Mark this product block as a store Best Seller recommendation.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2px after:left-2px after:bg-white after:border-border after:border after:rounded-full after:h-5 Custom after:w-5 after:transition-all peer-checked:bg-accent" />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="w-full sm:w-fit sm:px-10 shadow-md shadow-primary/5"
          >
            Publish Warehouse Item
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
