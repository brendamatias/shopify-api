import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["test", "development", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  SHOPIFY_API_KEY: z.string(),
  SHOPIFY_API_SECRET: z.string(),
  SHOPIFY_ACCESS_TOKEN: z.string(),
  SHOPIFY_SHOP_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("⚠️ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
