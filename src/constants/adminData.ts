export interface AdminProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft";
}

export interface AdminOrder {
  id: string;
  date: string;
  customer: string;
  itemsCount: number;
  totalPrice: number;
  paymentStatus: "PAID" | "PENDING";
  deliveryStatus: "SHIPPED" | "PENDING" | "CANCELLED";
}

export const adminProducts: AdminProduct[] = [
  {
    id: "prod-01",
    name: "Minimalist Leather Blazer",
    image: "/images/shop-minimalist-leather-blazer.jpg",
    category: "MINIMALIST",
    price: 129.0,
    stock: 45,
    status: "Active",
  },
  {
    id: "prod-02",
    name: "Vintage Canvas Utility Outerwear",
    image: "/images/product-vintage-orange-jacket-01.jpg",
    category: "STREETWEAR",
    price: 89.5,
    stock: 28,
    status: "Active",
  },
  {
    id: "prod-03",
    name: "Casual Knitwear Fall Sweater",
    image: "/images/shop-casual-knitwear-fall.jpg",
    category: "MINIMALIST",
    price: 64.0,
    stock: 60,
    status: "Active",
  },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "ORD-8FK2P9",
    date: "July 27, 2026",
    customer: "Vincent M. Parkolwa",
    itemsCount: 1,
    totalPrice: 95.0,
    paymentStatus: "PAID",
    deliveryStatus: "PENDING",
  },
  {
    id: "ORD-4PL9X2",
    date: "August 14, 2026",
    customer: "Jane Doe",
    itemsCount: 2,
    totalPrice: 258.0,
    paymentStatus: "PAID",
    deliveryStatus: "SHIPPED",
  },
  {
    id: "ORD-9TR3W1",
    date: "August 29, 2026",
    customer: "John Smith",
    itemsCount: 3,
    totalPrice: 184.2,
    paymentStatus: "PENDING",
    deliveryStatus: "PENDING",
  },
];
