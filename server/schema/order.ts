import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z
    .string()
    .min(1, "Quantity must be at least 1")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive number",
    }),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a non-negative number",
    }),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  paymentMethod: z.enum(["cash", "card", "qr"]).optional(),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
});

export const orderUpdateSchema = z.object({
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
  paymentMethod: z.enum(["cash", "card", "qr"]).optional(),
  notes: z.string().optional(),
});

export const orderQuerySchema = z.object({
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
  userId: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
