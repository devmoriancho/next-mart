"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Size, Category, ProductType } from "@/generated/prisma";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FiX, FiCheck } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

interface AddProductFormInputs {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: Category;
  productType: ProductType;
}

const availableSizes: Size[] = [
  Size.XS,
  Size.S,
  Size.M,
  Size.L,
  Size.XL,
  Size.XXL,
];

const productTypes: ProductType[] = [
  ProductType.HOODIES,
  ProductType.JACKETS,
  ProductType.JEANS,
  ProductType.SHIRTS,
  ProductType.SHORTS,
  ProductType.TROUSERS,
  ProductType.T_SHIRTS,
  ProductType.SHOES,
];

const categories: Category[] = [
  Category.MEN,
  Category.WOMEN,
  Category.CHILDREN,
];

const availableColors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Gray", value: "#6B7280" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Blue", value: "#2563EB" },
  { name: "Brown", value: "#8B5E3C" },
];

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormInputs>({
    defaultValues: {
      category: Category.MEN,
      productType: ProductType.T_SHIRTS,
      stock: "0",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImages((prev) => [...prev, ...files].slice(0, 4));
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: Size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (colorHex: string) => {
    setColors((prev) =>
      prev.includes(colorHex)
        ? prev.filter((c) => c !== colorHex)
        : [...prev, colorHex],
    );
  };

  const handleCreateProduct = async (data: AddProductFormInputs) => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    if (sizes.length === 0) {
      alert("Please select at least one available size dimension.");
      return;
    }

    if (colors.length === 0) {
      alert("Please select at least one inventory color variant.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("productType", data.productType);
      formData.append("bestSeller", String(bestSeller));

      images.forEach((file) => formData.append("images", file));
      sizes.forEach((size) => formData.append("sizes", size));

      colors.forEach((colorHex) => {
        const foundColor = availableColors.find((c) => c.value === colorHex);
        const colorObject = {
          name: foundColor ? foundColor.name : "Custom",
          value: colorHex,
        };
        formData.append("colors", JSON.stringify(colorObject));
      });

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product listing.");
      }

      alert("Product published successfully!");
      setImages([]);
      setSizes([]);
      setColors([]);
      setBestSeller(false);
      reset();
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? err.message
          : "An unexpected server error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateProduct)}
      className="mx-auto max-w-5xl space-y-8 px-4 py-8"
    >
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Add Product</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Publish a new inventory catalog item to the public storefront
          channels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Input
            label="Product Name"
            placeholder="e.g., Slim Fit Essential Hoodie"
            {...register("name", { required: "Product name is required" })}
            error={errors.name?.message}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Product Description</label>
            <textarea
              rows={4}
              placeholder="Provide a detailed description of sizing metrics, textures, and apparel cuts..."
              className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-xs text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              placeholder="59.99"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be above zero" },
              })}
              error={errors.price?.message}
            />
            <Input
              label="Stock Quantity"
              type="number"
              placeholder="50"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              error={errors.stock?.message}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">
              Media Upload (Max 4 Images)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="grid grid-cols-4 gap-3">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    width={200}
                    height={200}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-destructive hover:bg-background"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:bg-muted"
                >
                  <LuPlus className="h-5 w-5" />
                  <span className="mt-1 text-xs">Add File</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Target Demographics Category
              </label>
              <select
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none"
                {...register("category")}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Apparel Style Classification
              </label>
              <select
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none"
                {...register("productType")}
              >
                {productTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-medium">Available Dimensions</label>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`h-10 w-14 rounded-md border text-xs font-semibold tracking-wide transition-all ${
                  active
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "bg-background border-border text-foreground hover:bg-muted"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-medium">
          Available Inventory Colors
        </label>
        <div className="flex flex-wrap gap-4">
          {availableColors.map((color) => {
            const active = colors.includes(color.value);
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => toggleColor(color.value)}
                style={{ backgroundColor: color.value }}
                className={`relative h-8 w-8 rounded-full border border-black/10 shadow-sm transition-transform hover:scale-105 ${
                  active ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                title={color.name}
              >
                {active && (
                  <FiCheck
                    className={`absolute inset-0 m-auto h-4 w-4 ${color.name === "White" ? "text-black" : "text-white"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="bestSeller" className="text-sm font-medium select-none">
          Highlight this item as a store catalog bestseller promotion.
        </label>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing Catalog..." : "Publish Product Listing"}
        </Button>
      </div>
    </form>
  );
}
