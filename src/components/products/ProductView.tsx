"use client";

import { useState } from "react";
import Image from "next/image";
import { IoBagAddOutline } from "react-icons/io5";
import Button from "@/components/ui/Button";
import BreadCrumb from "@/components/ui/BreadCrumb";

import { singleProductDetail } from "@/constants/dummyProducts";

export default function ProductPageComponent() {
  const product = singleProductDetail;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [selectedColor, setSelectedColor] = useState(product.colors[1]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 mt-6">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {product.images.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  selectedImage === image ? "border-accent" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} gallery thumbnail`}
                  width={90}
                  height={110}
                  className="h-24 w-20 object-cover md:h-28 md:w-24"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface border border-border shadow-md">
            <Image
              src={selectedImage}
              alt={`${product.name} Main View`}
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-cover transition-all duration-300"
              priority
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <span className="text-xs font-bold tracking-wider uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-black text-foreground">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-sm font-bold tracking-wide text-foreground uppercase">
              Select Size
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition cursor-pointer hover:border-accent ${
                    selectedSize === size
                      ? "border-accent bg-primary text-primary-foreground"
                      : "border-border text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-bold tracking-wide text-foreground uppercase">
              Select Color
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition cursor-pointer ${
                    selectedColor.name === color.name
                      ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "border-border"
                  }`}
                >
                  <span
                    className="h-8 w-8 rounded-full border border-black/5"
                    style={{ backgroundColor: color.value }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-surface/50 border border-border p-4 text-xs font-medium space-y-1 max-w-sm">
            <p className="text-muted-foreground">
              Selected Size:{" "}
              <span className="font-bold text-foreground">{selectedSize}</span>
            </p>
            <p className="text-muted-foreground">
              Selected Color:{" "}
              <span className="font-bold text-foreground">
                {selectedColor.name}
              </span>
            </p>
          </div>

          <div className="mt-8">
            <Button
              fullWidth
              className="sm:w-fit sm:px-12"
              leftIcon={<IoBagAddOutline size={20} />}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
