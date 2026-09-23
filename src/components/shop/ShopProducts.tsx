import { Category, ProductType } from "@/generated/prisma";
import { getShopProducts } from "@/server-actions/products/getShopproducts";
import EmptyState from "../ui/EmptyState";
import ProductCard from "../products/ProductCard";

interface ShopProducts {
  searchParams: {
    category?: string;
    productType?: string;
    sort?: "low-high" | "high-low" | "newest" | "oldest";
  };
}

export default async function ShopProducts({ searchParams }: ShopProducts) {
  const products = await getShopProducts({
    categories: searchParams.category?.split(",") as Category[] | undefined,
    productTypes: searchParams.productType?.split(",") as
      | ProductType[]
      | undefined,
    sort: searchParams.sort,
  });

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        subTitle="Try changing your filters or check back later."
      />
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {products.length} product {products.length !== 1 && "s"}
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              image: product.images[0].imageUrl,
              price: product.price,
              category: String(product.category),
            }}
          />
        ))}
      </div>
    </>
  );
}
