import { z } from "zod";
import { validateBigInt } from "@/utils";

export const listProductSchema = z.object({
  page: z.coerce.number().positive("Página inválida").default(1),
  limit: z.coerce.number().positive("Limite inválida").default(10),
});

export const getProductSchema = z.object({
  id: z
    .string()
    .refine((value) => validateBigInt(value), {
      message: "Id do produto inválido",
    })
    .transform((value) => BigInt(value)),
});

const variantSchema = z.object({
  title: z.string(),
  price: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Preço deve ser um número com até duas casas decimais"
    ),
  sku: z.string().optional(),
  inventory_quantity: z.number().int(),
  inventory_policy: z.enum(["deny", "continue"]),
  fulfillment_service: z.string(),
  requires_shipping: z.boolean(),
  weight: z.number(),
  weight_unit: z.enum(["kg", "g", "lb", "oz"]),
  taxable: z.boolean(),
  option1: z.string(),
});

export const createProductSchema = z.object({
  title: z.string(),
  body_html: z.string().optional(),
  vendor: z.string(),
  product_type: z.string(),
  tags: z.string(),
  status: z.enum(["active", "draft", "archived"]),
  variants: z.array(variantSchema),
  images: z.array(z.any()).optional(),
});

export const deleteProductSchema = z.object({
  id: z
    .string()
    .refine((value) => validateBigInt(value), {
      message: "Id do produto inválido",
    })
    .transform((value) => BigInt(value)),
});
