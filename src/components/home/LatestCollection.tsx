import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../products/ProductCard";
import { dummyLatestCollections } from "@/constants/dummyProducts";

export default function LatestCollection() {
  return (
    <section className="bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Latest Collections"
          subTitle="New Arrivals added weekly"
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {dummyLatestCollections.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
