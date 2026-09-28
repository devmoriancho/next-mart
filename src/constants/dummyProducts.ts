import { z } from "zod";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export interface DetailedProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export const singleProductDetail: DetailedProduct = {
  id: "prod-02",
  name: "Vintage Canvas Utility Outerwear",
  price: 89.5,
  category: "Streetwear",
  description:
    "Constructed from heavyweight washed canvas duck fabric, complete with structured architectural welt drops and micro-brushed seams. Engineered for long-term resource durability and fluid layering across seasonal shifts.",
  images: [
    "/images/product-vintage-orange-jacket-01.jpg",
    "/images/product-vintage-orange-jacket-02.jpg",
    "/images/shop-vintage-denim-jacket-01.jpg",
    "/images/shop-vintage-denim-jacket-02.jpg",
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Obsidian", value: "#121214" },
    { name: "Russet Orange", value: "#c25e25" },
    { name: "Slate Muted", value: "#64748b" },
  ],
};

export const dummyLatestCollections: Product[] = [
  {
    id: "prod-01",
    name: "Minimalist Leather Blazer",
    image: "/images/shop-minimalist-leather-blazer.jpg",
    price: 129.0,
    category: "Minimalist",
  },
  {
    id: "prod-02",
    name: "Vintage Canvas Utility Outerwear",
    image: "/images/product-vintage-orange-jacket-01.jpg",
    price: 89.5,
    category: "Streetwear",
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
  ...dummyLatestCollections,
  {
    id: "prod-05",
    name: "Urban Studio Editorial Trench",
    image: "/images/shop-editorial-trenchcoat-men.jpg",
    price: 175.0,
    category: "Premium Line",
  },
  {
    id: "prod-06",
    name: "Monochrome Corporate Blazer",
    image: "/images/shop-monochrome-suit-editorial.jpg",
    price: 145.0,
    category: "Minimalist",
  },
  {
    id: "prod-07",
    name: "Fine Luxury Pendant Necklace",
    image: "/images/product-fine-jewelry-necklace.jpg",
    price: 95.0,
    category: "Accessories",
  },
  {
    id: "prod-08",
    name: "Oversized Relaxed Streetwear Hoodie",
    image: "/images/shop-relaxed-oversized-hoodie.jpg",
    price: 78.0,
    category: "Streetwear",
  },
];

export const dummyCartItems: CartItem[] = [
  {
    id: "cart-item-01",
    product: dummyShopProducts[1],
    quantity: 1,
    selectedSize: "M",
    selectedColor: "Russet Orange",
  },
  {
    id: "cart-item-02",
    product: dummyShopProducts[0],
    quantity: 2,
    selectedSize: "L",
    selectedColor: "Obsidian",
  },
];

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Full name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters")
    .max(100, "Subject must not exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must not exceed 1000 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
