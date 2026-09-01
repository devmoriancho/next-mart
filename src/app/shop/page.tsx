import FrontEndLayout from "@/components/layout/FrontEndLayout";
import ProductCard from "@/components/products/ProductCard";
import FilterOptions from "@/components/shop/FilterOptions";

import { dummyShopProducts } from "@/constants/dummyProducts";

export default function ShopPage() {
  return (
    <FrontEndLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterOptions />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
              <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                All Collections
              </h1>

              <div className="relative">
                <select className="appearance-none rounded-xl border border-border bg-surface/30 px-4 py-2.5 pr-10 text-sm font-semibold text-foreground focus:border-accent focus:outline-none cursor-pointer">
                  <option value="low-high">Price: Baseline First</option>
                  <option value="high-low">Price: Premium First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {dummyShopProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FrontEndLayout>
  );
}
