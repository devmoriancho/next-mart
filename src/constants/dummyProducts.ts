export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export const dummyLatestCollections: Product[] = [
  {
    id: "prod-01",
    name: "Minimalist Leather Blazer",
    image: "/images/shop-minimalist-leather-blazer.jpg",
    price: 129.0,
    category: "Outerwear",
  },
  {
    id: "prod-02",
    name: "Vintage Orange Utility Jacket",
    image: "/images/product-vintage-orange-jacket-01.jpg",
    price: 89.5,
    category: "Jackets",
  },
  {
    id: "prod-03",
    name: "Casual Knitwear Fall Sweater",
    image: "/images/shop-casual-knitwear-fall.jpg",
    price: 64.0,
    category: "Knitwear",
  },
  {
    id: "prod-04",
    name: "Classic Silk Stacking Ring",
    image: "/images/product-silver-stacking-rings.jpg",
    price: 45.0,
    category: "Accessories",
  },
];
