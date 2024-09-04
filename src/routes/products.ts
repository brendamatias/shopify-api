import { type FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product.controller";

export async function productsRoutes(app: FastifyInstance) {
  app.get("", ProductController.get);
}
