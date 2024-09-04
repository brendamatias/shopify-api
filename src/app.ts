import fastify from "fastify";
import { productsRoutes } from "./routes";
import { ZodError } from "zod";

export const app = fastify();

app.setErrorHandler(function (error, _, reply) {
  console.log(error);
  app.log.warn(error);

  if (error instanceof ZodError) {
    return reply.status(500).send({
      message: "Erro na validação dos dados",
      error: JSON.parse(error.message),
    });
  }

  reply.status(500).send({
    message: "Ocorreu um erro. Tente novamente.",
  });
});

app.register(productsRoutes, {
  prefix: "products",
});

app.get("/", async () => {
  return "Hello World";
});
