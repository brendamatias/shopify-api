import { PrismaClient } from "@prisma/client";
import { app } from "./app";
import { env } from "@/config/env";

export const prisma = new PrismaClient();

if (env.NODE_ENV !== "test") {
  app.listen(env.PORT, () => {
    console.log("HTTP Server Running!");
  });
}
