import FrontEndLayout from "@/components/layout/FrontEndLayout";
import ProductPageComponent from "@/components/products/ProductView";

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function DynamicProductPage({ params }: PageProps) {
  const { productId } = await params;

  return (
    <FrontEndLayout>
      <ProductPageComponent />
    </FrontEndLayout>
  );
}
