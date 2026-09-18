"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiChevronLeft } from "react-icons/fi";
import AdminLayout from "@/components/layout/AdminLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  categoryValues,
  productPayloadSchema,
  productTypeValues,
  sizeValues,
  type ProductPayloadValues,
} from "@/lib/validations/product";

const colors = [
  { name: "Black", value: "#121214" },
  { name: "White", value: "#ffffff" },
  { name: "Gray", value: "#64748b" },
  { name: "Navy", value: "#1e3a8a" },
  { name: "Brown", value: "#8b5a2b" },
];

type EditProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default function EditProductPage({ params }: EditProductPageProps) {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("Loading product...");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof productPayloadSchema>,
    unknown,
    ProductPayloadValues
  >({
    resolver: zodResolver(productPayloadSchema),
    defaultValues: {
      category: "MEN",
      productType: "T_SHIRTS",
      bestSeller: false,
      sizes: ["M"],
      colors: [colors[0]],
    },
  });

  const selectedSizes = useWatch({ control, name: "sizes" });
  const selectedColors = useWatch({ control, name: "colors" });

  useEffect(() => {
    params
      .then(({ productId: id }) => {
        setProductId(id);
        return fetch(`/api/products/${id}`);
      })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load product.");
        const { product } = await response.json();
        reset({
          name: product.name,
          description: product.description,
          price: Number(product.price),
          stock: product.stock,
          category: product.category,
          productType: product.productType,
          bestSeller: product.bestSeller,
          sizes: product.sizes.map(
            (item: { size: ProductPayloadValues["sizes"][number] }) =>
              item.size,
          ),
          colors: product.colors,
        });
        setMessage("");
      })
      .catch((error: unknown) => {
        setMessage(
          error instanceof Error ? error.message : "Unable to load product.",
        );
      });
  }, [params, reset]);

  const onSubmit = async (values: ProductPayloadValues) => {
    setMessage("");
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    setMessage(result.message);
  };

  return (
    <AdminLayout>
      <div className="mb-10 border-b border-border pb-5">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-accent mb-3"
        >
          <FiChevronLeft size={14} /> Back to Inventory
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Edit Product
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
        <div className="space-y-5 rounded-2xl border border-border bg-surface/20 p-6">
          <Input
            label="Product Name"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Description"
            variant="textarea"
            {...register("description")}
            error={errors.description?.message}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              error={errors.price?.message}
            />
            <Input
              label="Stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              error={errors.stock?.message}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <select
            {...register("category")}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          >
            {categoryValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            {...register("productType")}
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          >
            {productTypeValues.map((value) => (
              <option key={value} value={value}>
                {value.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-border bg-surface/20 p-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
            Available Sizes
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {sizeValues.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setValue(
                    "sizes",
                    selectedSizes.includes(size)
                      ? selectedSizes.filter((item) => item !== size)
                      : [...selectedSizes, size],
                    { shouldValidate: true },
                  )
                }
                className={`flex h-10 w-11 items-center justify-center rounded-lg border text-xs font-bold ${selectedSizes.includes(size) ? "border-accent bg-primary text-primary-foreground" : "border-border text-foreground"}`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && (
            <p className="mt-2 text-xs text-destructive">
              {errors.sizes.message}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface/20 p-6">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
            Available Colors
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() =>
                  setValue("colors", [color], { shouldValidate: true })
                }
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${selectedColors.some((item) => item.name === color.name) ? "border-accent ring-2 ring-accent/30" : "border-border"}`}
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </button>
            ))}
          </div>
          {errors.colors && (
            <p className="mt-2 text-xs text-destructive">
              {errors.colors.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-3 text-sm font-semibold text-foreground">
          <input type="checkbox" {...register("bestSeller")} /> Bestseller
        </label>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </form>
    </AdminLayout>
  );
}
