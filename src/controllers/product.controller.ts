import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../server";
import { getMetaPagination, skip } from "../utils";
import { productListSchema } from "../schemas";

export const ProductController = {
  async get(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = productListSchema.parse(request.query);

    const [total, data] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: skip({ page, limit }),
        take: limit,
        orderBy: { name: "asc" },
      }),
    ]);

    return reply
      .status(200)
      .send(getMetaPagination({ page, limit, total, data }));
  },
};
