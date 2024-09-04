import { z } from "zod";

export const productListSchema = z.object({
  page: z.coerce.number().positive("Página inválida").default(1),
  limit: z.coerce.number().positive("Limite inválida").default(10),
});
