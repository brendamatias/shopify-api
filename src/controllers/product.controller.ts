import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../server";
import { getMetaPagination, skip } from "../utils";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  listProductSchema,
} from "../schemas";
import { session, shopify } from "../config";
import { DataType } from "@shopify/shopify-api";

const formatProductData = (product: Product) => {
  return {
    id: product.id,
    title: product.title,
    bodyHtml: product.body_html,
    vendor: product.vendor,
    productType: product.product_type,
    createdAt: new Date(product.created_at),
    handle: product.handle,
    updatedAt: new Date(product.updated_at),
    publishedAt: product.published_at,
    templateSuffix: product.template_suffix,
    publishedScope: product.published_scope,
    tags: product.tags,
    status: product.status,
    adminGraphqlApiId: product.admin_graphql_api_id,
    images: {
      create: product.images.map((image: any) => ({
        id: image.id,
        src: image.src,
        alt: image.alt,
        createdAt: image.created_at,
        updatedAt: image.updated_at,
      })),
    },
    variants: {
      create: product.variants.map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        price: parseFloat(variant.price),
        position: variant.position,
        option1: variant.option1,
        inventoryManagement: variant.inventory_management,
        sku: variant.sku,
        weight: variant.weight,
        weightUnit: variant.weight_unit,
        inventoryQuantity: variant.inventory_quantity,
        inventoryPolicy: variant.inventory_policy,
        createdAt: variant.created_at,
        updatedAt: variant.updated_at,
        compareAtPrice: variant.compare_at_price,
        taxable: variant.taxable,
        barcode: variant.barcode,
        fulfillmentService: variant.fulfillment_service,
        grams: variant.grams,
        requiresShipping: variant.requires_shipping,
        inventoryItemId: variant.inventory_item_id,
        oldInventoryQuantity: variant.old_inventory_quantity,
        adminGraphqlApiId: variant.admin_graphql_api_id,
        imageId: variant.image_id ? BigInt(variant.image_id) : null,
      })),
    },
    options: {
      create: product.options.map((option: any) => ({
        id: option.id,
        name: option.name,
        values: {
          set: option.values,
        },
        position: option.position,
      })),
    },
  };
};

export const ProductController = {
  async get(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = listProductSchema.parse(request.query);

    const [total, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: skip({ page, limit }),
        take: limit,
        orderBy: { title: "asc" },
      }),
    ]);

    const data = products.map((product) => ({
      ...product,
      id: product.id.toString(),
    }));

    return reply
      .status(200)
      .send(getMetaPagination({ page, limit, total, data }));
  },
  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getProductSchema.parse(request.params);
    const client = new shopify.clients.Rest({ session });

    let product = await prisma.product.findUnique({
      where: { id },
    });

    try {
      const response = await client.get({
        path: `products/${id}`,
        query: { id: 1 },
      });

      const shopifyProduct = response.body.product;

      if (!product) {
        product = await prisma.product.create({
          data: formatProductData(shopifyProduct),
        });
      }

      return reply.status(200).send({
        ...product,
        id: product.id.toString(),
      });
    } catch (error) {
      const err = error as { response: { code: number } };
      const status = err?.response?.code;

      if (status === 404) {
        return reply.status(404).send({ message: "Produto não encontrado" });
      }

      return reply
        .status(500)
        .send({ message: "Ocorreu um erro ao tentar visualizar produto" });
    }
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = createProductSchema.parse(request.body);

    const client = new shopify.clients.Rest({ session });

    const response = await client.post({
      path: "products",
      data: { product: body },
      type: DataType.JSON,
    });

    const shopifyProduct = response.body.product;

    await prisma.product.create({
      data: formatProductData(shopifyProduct),
    });

    return reply.status(201).send();
  },
  async destroy(request: FastifyRequest, reply: FastifyReply) {
    const { id } = deleteProductSchema.parse(request.params);

    const client = new shopify.clients.Rest({ session });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    try {
      const productShopify = await client.get({
        path: `products/${id}`,
        query: { id: 1 },
      });

      if (productShopify) {
        await client.delete({
          path: `products/${id}`,
        });
      }

      if (product) {
        await prisma.product.delete({
          where: { id },
        });
      }

      return reply.status(204).send();
    } catch (error) {
      const err = error as { response: { code: number } };
      const status = err?.response?.code;

      if (!product && status === 404) {
        return reply.status(404).send({ message: "Produto não encontrado" });
      }

      if (product && status === 404) {
        await prisma.product.delete({
          where: { id },
        });
      }

      return reply
        .status(500)
        .send({ message: "Ocorreu um erro ao tentar deletar produto" });
    }
  },
};
