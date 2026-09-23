import FrontEndLayout from "@/components/layout/FrontEndLayout";
import FilterOptions from "@/components/shop/FilterOptions";
import ShopProducts from "@/components/shop/ShopProducts";
import { Suspense } from "react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    productType?: string;
    sort?: "low-high" | "high-low" | "newest" | "oldest";
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  return (
    <FrontEndLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterOptions />

          <div className="flex-1">
            <Suspense>
              <ShopProducts searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </FrontEndLayout>
  );
}
