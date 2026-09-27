import { Suspense } from "react";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import ProductPageComponent from "@/components/products/ProductView";
import { getProduct } from "@/server-actions/products/getProduct";
import { notFound } from "next/navigation";
import ProductPageSkeleton from "@/components/loading/skeletons/ProductPageSkeleton";

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function DynamicProductPage({ params }: PageProps) {
  const { productId } = await params;

  return (
    <FrontEndLayout>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductContent productId={productId} />
      </Suspense>
    </FrontEndLayout>
  );
}

async function ProductContent({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductPageComponent product={product} />;
}
