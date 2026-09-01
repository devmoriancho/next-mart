import FrontEndLayout from "@/components/layout/FrontEndLayout";
import ProductPageComponent from "@/components/products/ProductPageComponent";

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
