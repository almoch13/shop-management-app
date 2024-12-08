import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  motif: z.string().min(1, { message: "Motif is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Stock must be a number" })
    .refine((val) => val > 0, { message: "Stock must be greater than zero" }),
  sellingPrice: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Selling Price must be a number" })
    .refine((val) => val > 0, {
      message: "Selling Price must be greater than zero",
    }),
});
