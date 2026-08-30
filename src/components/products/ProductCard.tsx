import Image from "next/image";
import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";
import { Product } from "@/constants/dummyProducts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-background">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-surface border border-border">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-w-7xl) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-all hover:bg-primary hover:text-primary-foreground active:scale-95">
            <IoBagOutline size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs tracking-wider uppercase text-muted-foreground font-medium">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`} className="focus:outline-none">
          <h3 className="text-sm font-semibold text-foreground hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
