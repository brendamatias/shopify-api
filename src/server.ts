import { PrismaClient } from "@prisma/client";
import { app } from "./app";
import { env } from "./config/env";

export const prisma = new PrismaClient();

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
