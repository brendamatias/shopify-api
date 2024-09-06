import { Request, Response } from "express";
import { session, shopify } from "@/config";
import { prisma } from "@/server";
import { getProductSchema, listProductSchema } from "@/schemas";
import { getMetaPagination } from "@/utils";
import { DataType } from "@shopify/shopify-api";

export const ShopifyController = {
  async get(req: Request, res: Response) {
    const { limit } = listProductSchema.parse(req.query);
    const client = new shopify.clients.Rest({ session });

    let productsCount = await client.get({
      path: "products/count",
      type: DataType.JSON,
    });

    let { body } = await client.get({
      path: "products",
      query: {
        limit,
      },
      type: DataType.JSON,
    });

    return res.status(200).send(
      getMetaPagination({
        page: 1,
        limit,
        total: productsCount.body.count,
        data: body.products,
      })
    );
  },
  async getById(req: Request, res: Response) {
    const { id } = getProductSchema.parse(req.params);
    const client = new shopify.clients.Rest({ session });

    try {
      const response = await client.get({
        path: `products/${id}`,
        query: { id: 1 },
      });

      return res.status(200).send(response.body.product);
    } catch (error) {
      const err = error as { response: { code: number } };
      const status = err?.response?.code;

      if (status === 404) {
        return res.status(404).send({ message: "Produto não encontrado" });
      }

      return res
        .status(500)
        .send({ message: "Ocorreu um erro ao tentar visualizar produto" });
    }
  },
  async sync(req: Request, res: Response) {
    const client = new shopify.clients.Rest({ session });

    const { body } = await client.get({
      path: "products",
    });

    const products = body.products as Product[];

    const updatePromises = products.map(async (product) => {
      await prisma.product.upsert({
        where: {
          id: product.id,
        },
        update: {
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
            upsert: product.images.map((image) => ({
              where: {
                id: image.id,
              },
              update: {
                src: image.src,
                alt: image.alt,
                createdAt: image.created_at,
                updatedAt: image.updated_at,
              },
              create: {
                id: image.id,
                src: image.src,
                alt: image.alt,
                createdAt: image.created_at,
                updatedAt: image.updated_at,
              },
            })),
          },
          variants: {
            // @ts-ignore
            upsert: product.variants.map((variant) => ({
              where: {
                id: variant.id,
              },
              update: {
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
              },
              create: {
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
              },
            })),
          },
          options: {
            upsert: product.options.map((option) => ({
              where: {
                id: option.id,
              },
              update: {
                name: option.name,
                values: {
                  set: option.values,
                },
                position: option.position,
              },
              create: {
                id: option.id,
                name: option.name,
                values: {
                  set: option.values,
                },
                position: option.position,
              },
            })),
          },
        },
        create: {
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
        },
      });
    });

    await Promise.all(updatePromises);

    const ids = products.map((product) => product.id);

    await prisma.product.deleteMany({
      where: {
        id: { notIn: ids },
      },
    });

    return res.status(204).send();
  },
};
