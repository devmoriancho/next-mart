"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiTrash2, FiUpload } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import AdminLayout from "@/components/layout/AdminLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  categoryValues,
  productSchema,
  productTypeValues,
  sizeValues,
  type ProductFormValues,
} from "@/lib/validations/product";

export default function CreateProductPage() {
  const [selectedImages, setSelectedImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof productSchema>, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "MEN",
      productType: "T_SHIRTS",
      bestSeller: false,
      sizes: ["M"],
      colors: [{ name: "Black", value: "#121214" }],
      images: [],
    },
  });

  const selectedSizes = useWatch({ control, name: "sizes" });
  const selectedImagesRef = useRef(selectedImages);

  useEffect(() => {
    selectedImagesRef.current = selectedImages;
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      selectedImagesRef.current.forEach(({ previewUrl }) =>
        URL.revokeObjectURL(previewUrl),
      );
    };
  }, []);

  const colorsList = [
    { name: "Black", value: "#121214" },
    { name: "White", value: "#ffffff" },
    { name: "Gray", value: "#64748b" },
    { name: "Navy", value: "#1e3a8a" },
    { name: "Brown", value: "#8b5a2b" },
  ];

  const handleCreateSubmit = async (values: ProductFormValues) => {
    setMessage("");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    formData.append("category", values.category);
    formData.append("productType", values.productType);
    formData.append("bestSeller", String(values.bestSeller));
    values.sizes.forEach((size) => formData.append("sizes", size));
    values.colors.forEach((color) =>
      formData.append("colors", JSON.stringify(color)),
    );
    values.images.forEach((image) => formData.append("images", image));

    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    setMessage(result.message);
  };

  const handleImagesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(
      0,
      4 - selectedImages.length,
    );
    const nextImages = [
      ...selectedImages,
      ...files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ];

    setSelectedImages(nextImages);
    setValue(
      "images",
      nextImages.map(({ file }) => file),
      { shouldValidate: true },
    );
    event.target.value = "";
  };

  const handleImageRemove = (index: number) => {
    const image = selectedImages[index];
    URL.revokeObjectURL(image.previewUrl);
    const nextImages = selectedImages.filter(
      (_, imageIndex) => imageIndex !== index,
    );
    setSelectedImages(nextImages);
    setValue(
      "images",
      nextImages.map(({ file }) => file),
      { shouldValidate: true },
    );
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

      <form
        onSubmit={handleSubmit(handleCreateSubmit)}
        className="space-y-6 max-w-4xl"
      >
        {/* Block 1: Product Gallery Upload Zones */}
        <div className="rounded-2xl border border-border bg-surface/20 p-6">
          <h3 className="text-xs font-bold tracking-wider text-foreground uppercase mb-1">
            Product Images
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Upload between 1 and 4 product catalog asset views.
          </p>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative flex aspect-3/4 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 hover:bg-surface/30 hover:border-accent/40 transition cursor-pointer p-4 text-center group"
              >
                {selectedImages[index] ? (
                  <>
                    <img
                      src={selectedImages[index].previewUrl}
                      alt={`Product preview ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      aria-label={`Remove product image ${index + 1}`}
                      onClick={() => handleImageRemove(index)}
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-destructive shadow"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </>
                ) : (
                  <label
                    htmlFor="product-images"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                  >
                    <FiUpload
                      size={18}
                      className="text-muted-foreground group-hover:text-accent transition-colors"
                    />
                    <span className="mt-2 text-[10px] font-bold text-muted-foreground tracking-wide uppercase group-hover:text-foreground">
                      + Upload
                    </span>
                  </label>
                )}
              </div>
            ))}
          </div>
          <input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesSelected}
            disabled={selectedImages.length === 4}
            className="sr-only"
          />
          {errors.images && (
            <p className="mt-2 text-xs text-destructive">
              {errors.images.message}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-5">
          <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3">
            Product Core Meta Data
          </h3>

          <Input
            label="Product Title Name"
            placeholder="e.g. Vintage Canvas Utility Outerwear"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Product Profile Description"
            variant="textarea"
            placeholder="Describe your garment details, stitching patterns, and material properties thoroughly..."
            {...register("description")}
            error={errors.description?.message}
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
              {...register("price", { valueAsNumber: true })}
              error={errors.price?.message}
            />
            <Input
              label="Stock Count Quantity"
              placeholder="25"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              error={errors.stock?.message}
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
              <select
                {...register("category")}
                className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 mt-1.5 text-sm font-medium text-foreground outline-none focus:border-accent cursor-pointer"
              >
                {categoryValues.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Product Segment Type
              </label>
              <select
                {...register("productType")}
                className="w-full rounded-xl border border-border bg-surface/40 px-4 py-3 mt-1.5 text-sm font-medium text-foreground outline-none focus:border-accent cursor-pointer"
              >
                {productTypeValues.map((productType) => (
                  <option key={productType} value={productType}>
                    {productType.replaceAll("_", " ")}
                  </option>
                ))}
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
              {sizeValues.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setValue(
                      "sizes",
                      selectedSizes.includes(size)
                        ? selectedSizes.filter((selected) => selected !== size)
                        : [...selectedSizes, size],
                      { shouldValidate: true },
                    )
                  }
                  className={`flex h-10 w-11 items-center justify-center rounded-lg border text-xs font-bold tracking-wider transition cursor-pointer hover:border-accent ${
                    selectedSizes.includes(size)
                      ? "border-accent bg-primary text-primary-foreground"
                      : "border-border text-foreground bg-background/40"
                  }`}
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
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3 mb-4">
              Available Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorsList.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setValue("colors", [color], { shouldValidate: true });
                  }}
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
            {errors.colors && (
              <p className="mt-2 text-xs text-destructive">
                {errors.colors.message}
              </p>
            )}
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
              {...register("bestSeller")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2px after:left-2px after:bg-white after:border-border after:border after:rounded-full after:h-5 Custom after:w-5 after:transition-all peer-checked:bg-accent" />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-fit sm:px-10 shadow-md shadow-primary/5"
          >
            {isSubmitting ? "Publishing..." : "Publish Warehouse Item"}
          </Button>
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </form>
    </AdminLayout>
  );
}
