import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
  stock: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Stock must be a non-negative number",
    }),
  barcode: z.string().optional(),
  categoryId: z.string().optional(),
  image: z.string().url("Invalid URL").optional(),
  isActive: z.boolean().optional(),
});

export const productUpdateSchema = productSchema.partial();

export const productQuerySchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
