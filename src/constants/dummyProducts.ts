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

export const dummyShopProducts: Product[] = [
  {
    id: "shop-01",
    name: "Minimalist Leather Blazer",
    image: "/images/shop-minimalist-leather-blazer.jpg",
    price: 129.0,
    category: "Minimalist",
  },
  {
    id: "shop-02",
    name: "Vintage Orange Utility Jacket",
    image: "/images/product-vintage-orange-jacket-01.jpg",
    price: 89.5,
    category: "Streetwear",
  },
  {
    id: "shop-03",
    name: "Casual Knitwear Fall Sweater",
    image: "/images/shop-casual-knitwear-fall.jpg",
    price: 64.0,
    category: "Minimalist",
  },
  {
    id: "shop-04",
    name: "Classic Silk Stacking Ring",
    image: "/images/product-silver-stacking-rings.jpg",
    price: 45.0,
    category: "Accessories",
  },
  {
    id: "shop-05",
    name: "Urban Studio Editorial Trench",
    image: "/images/shop-editorial-trenchcoat-men.jpg",
    price: 175.0,
    category: "Premium Line",
  },
  {
    id: "shop-06",
    name: "Monochrome Corporate Blazer",
    image: "/images/shop-monochrome-suit-editorial.jpg",
    price: 145.0,
    category: "Minimalist",
  },
  {
    id: "shop-07",
    name: "Fine Luxury Pendant Necklace",
    image: "/images/product-fine-jewelry-necklace.jpg",
    price: 95.0,
    category: "Accessories",
  },
  {
    id: "shop-08",
    name: "Oversized Relaxed Streetwear Hoodie",
    image: "/images/shop-relaxed-oversized-hoodie.jpg",
    price: 78.0,
    category: "Streetwear",
  },
];
