import { Suspense } from "react";
import ProductCard from "../products/ProductCard";
import SectionHeader from "../ui/SectionHeader";
import { getBestSelllerProducts } from "@/server-actions/products/getBestSellerProducts";
import ProductCardSkeleton from "../loading/skeletons/ProductCardSkeleton";

export const dynamic = "force-dynamic";

export default function BestSeller() {
  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        subTitle="Discover our most-loved places, carefully selected by"
      />

      <Suspense fallback={<ProductCardSkeleton number={5} />}>
        <BestSellerContent />
      </Suspense>
    </section>
  );
}

async function BestSellerContent() {
  const products = (await getBestSelllerProducts()) ?? [];

  return (
    <div className="my-18">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            product={{
              id: product.id,
              name: product.name,
              image: product.images[0].imageUrl,
              price: product.price,
              category: String(product.category),
            }}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
