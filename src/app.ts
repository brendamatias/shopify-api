import fastify from "fastify";
import { productsRoutes, shopifyRoutes } from "./routes";
import { ZodError } from "zod";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

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

app.register(swagger, {
  swagger: {
    info: {
      title: "Shopify Integration API",
      description: "API para gerenciamento de produtos na loja shopify",
      version: "1.0.0",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "products", description: "Product related end-points" },
      { name: "shopify", description: "Shopify related end-points" },
    ],
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: false,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.register(productsRoutes, {
  prefix: "products",
});

app.register(shopifyRoutes, {
  prefix: "shopify",
});

app.get("/", async () => {
  return "Hello World";
});
