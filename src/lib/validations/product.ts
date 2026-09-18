import { z } from "zod";

export const categoryValues = ["MEN", "WOMEN", "CHILDREN"] as const;
export const productTypeValues = [
  "T_SHIRTS",
  "SHIRTS",
  "HOODIES",
  "JACKETS",
  "JEANS",
  "TROUSERS",
  "SHORTS",
  "SHOES",
] as const;
export const sizeValues = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export const productColorSchema = z.object({
  name: z.string().trim().min(1),
  value: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid color value"),
});

const productFieldsSchema = z.object({
  name: z.string().trim().min(2, "Product name is required"),
  description: z.string().trim().min(10, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than zero"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  category: z.enum(categoryValues),
  productType: z.enum(productTypeValues),
  bestSeller: z.boolean(),
  sizes: z.array(z.enum(sizeValues)).min(1, "Select at least one size"),
  colors: z.array(productColorSchema).min(1, "Select at least one color"),
});

export const productSchema = productFieldsSchema.extend({
  images: z
    .array(z.instanceof(File))
    .min(1, "Select at least one image")
    .max(4, "Select no more than four images"),
});

export const productPayloadSchema = productFieldsSchema;

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductPayloadValues = z.infer<typeof productPayloadSchema>;
