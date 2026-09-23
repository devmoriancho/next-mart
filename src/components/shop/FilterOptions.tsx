"use client";

import { Category, ProductType } from "@/generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

interface ProductTypeFilterComponent {
  label: string;
  value: ProductType;
}
interface CategoryTypeFilterComponent {
  label: string;
  value: Category;
}

const productTypes: ProductTypeFilterComponent[] = [
  { label: "T-shirts", value: ProductType.T_SHIRTS },
  { label: "Shirts", value: ProductType.SHIRTS },
  { label: "Hoodies", value: ProductType.HOODIES },
  { label: "Jackets", value: ProductType.JACKETS },
  { label: "Jeans", value: ProductType.JEANS },
  { label: "Trousers", value: ProductType.TROUSERS },
  { label: "Shorts", value: ProductType.SHORTS },
  { label: "Shoes", value: ProductType.SHOES },
];

const categories: CategoryTypeFilterComponent[] = [
  { label: "Men", value: Category.MEN },
  { label: "Women", value: Category.WOMEN },
  { label: "Children", value: Category.CHILDREN },
];

export default function FilterOptions() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();
  const searchparams = useSearchParams();
  const selectedCategories =
    searchparams.get("category")?.split(",").filter(Boolean) ?? [];
  const selectedTypes =
    searchparams.get("productType")?.split(",").filter(Boolean) ?? [];

  const toggleFilter = (key: "category" | "productType", value: string) => {
    const params = new URLSearchParams(searchparams.toString());

    const values = params.get(key)?.split(",").filter(Boolean) ?? [];

    const updatedvalues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    if (updatedvalues.length === 0) {
      params.delete(key);
    } else {
      params.set(key, updatedvalues.join(","));
    }

    router.replace(`/shop?${params.toString()}`);
  };
  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="mb-6 flex items-center gap-2 text-sm font-bold tracking-wider text-foreground sm:cursor-default"
      >
        FILTERS
        <RiArrowRightDoubleFill
          className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          size={18}
        />
      </button>

      <div className={`space-y-5 sm:block ${showFilter ? "block" : "hidden"}`}>
        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <h3 className="mb-4 text-xs font-bold tracking-wider text-foreground">
            COLLECTIONS
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground font-medium">
            {categories.map((category) => (
              <label
                key={category.value}
                className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors"
              >
                <input
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => toggleFilter("category", category.value)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <h3 className="mb-4 text-xs font-bold tracking-wider text-foreground">
            PRODUCT SEGMENTS
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground font-medium">
            {productTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-3 cursor-pointer select-none hover:text-foreground transition-colors"
              >
                <input
                  checked={selectedTypes.includes(type.value)}
                  type="checkbox"
                  onChange={() => toggleFilter("productType", type.value)}
                  className="h-4 w-4 rounded border-border text-accent accent-accent focus:ring-accent"
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
