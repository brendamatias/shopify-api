import { type FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product.controller";

export async function productsRoutes(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        description: "Products list",
        tags: ["products"],
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", default: 1 },
            limit: { type: "integer", default: 10 },
          },
          required: ["page", "limit"],
        },
        response: {
          200: {
            properties: {
              meta: {
                type: "object",
                properties: {
                  page: { type: "integer", default: 1 },
                  limit: { type: "integer", default: 10 },
                  total: { type: "integer", default: 0 },
                  totalPages: { type: "integer", default: 1 },
                },
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier of the product",
                    },
                    title: {
                      type: "string",
                      description: "Title of the product",
                    },
                    bodyHtml: {
                      type: "string",
                      description: "HTML description of the product",
                      nullable: true,
                    },
                    vendor: {
                      type: "string",
                      description: "Vendor or store name",
                    },
                    productType: {
                      type: "string",
                      description: "Type or category of the product",
                    },
                    handle: {
                      type: "string",
                      description: "Handle used for the product URL",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Date and time when the product was created",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the product was last updated",
                    },
                    publishedAt: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the product was published",
                    },
                    templateSuffix: {
                      type: "string",
                      description: "Suffix for the product template",
                      nullable: true,
                    },
                    publishedScope: {
                      type: "string",
                      description: "Scope of product publication",
                    },
                    tags: {
                      type: "string",
                      description:
                        "Comma-separated tags associated with the product",
                    },
                    status: {
                      type: "string",
                      description:
                        "Current status of the product (e.g., active, draft, archived)",
                    },
                    adminGraphqlApiId: {
                      type: "string",
                      description: "GraphQL API ID for the product",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error occurred",
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
    ProductController.get
  );
  app.get(
    "/shopify/:id",
    {
      schema: {
        description: "Products list",
        tags: ["products"],
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", default: 1 },
            limit: { type: "integer", default: 10 },
          },
          required: ["page", "limit"],
        },
        response: {
          200: {
            properties: {
              id: {
                type: "string",
                description: "Unique identifier of the product",
              },
              title: {
                type: "string",
                description: "Title of the product",
              },
              bodyHtml: {
                type: "string",
                description: "HTML description of the product",
                nullable: true,
              },
              vendor: {
                type: "string",
                description: "Vendor or store name",
              },
              productType: {
                type: "string",
                description: "Type or category of the product",
              },
              handle: {
                type: "string",
                description: "Handle used for the product URL",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was created",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was last updated",
              },
              publishedAt: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was published",
              },
              templateSuffix: {
                type: "string",
                description: "Suffix for the product template",
                nullable: true,
              },
              publishedScope: {
                type: "string",
                description: "Scope of product publication",
              },
              tags: {
                type: "string",
                description: "Comma-separated tags associated with the product",
              },
              status: {
                type: "string",
                description:
                  "Current status of the product (e.g., active, draft, archived)",
              },
              adminGraphqlApiId: {
                type: "string",
                description: "GraphQL API ID for the product",
              },
            },
          },
          500: {
            description: "An error occurred",
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
    ProductController.getById
  );
  app.post(
    "/shopify",
    {
      schema: {
        description: "Delete a product",
        tags: ["products"],
        body: {
          type: "object",
          properties: {
            title: { type: "string", description: "Product title" },
            body_html: {
              type: "string",
              description: "Product HTML description",
              nullable: true,
            },
            vendor: { type: "string", description: "Product vendor or store" },
            product_type: { type: "string", description: "Type of product" },
            tags: {
              type: "string",
              description: "Tags associated with the product",
            },
            status: {
              type: "string",
              enum: ["active", "draft", "archived"],
              description: "Product status (active, draft, archived)",
            },
            variants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Variant title" },
                  price: {
                    type: "string",
                    pattern: "^\\d+(\\.\\d{1,2})?$",
                    description:
                      "Variant price (number with up to two decimal places)",
                    default: "0.00",
                  },
                  sku: {
                    type: "string",
                    description: "Variant SKU code",
                    nullable: true,
                  },
                  inventory_quantity: {
                    type: "integer",
                    description: "Stock quantity",
                  },
                  inventory_policy: {
                    type: "string",
                    enum: ["deny", "continue"],
                    description: "Inventory policy (deny, continue)",
                  },
                  fulfillment_service: {
                    type: "string",
                    description: "Fulfillment service for the variant",
                    default: "manual",
                  },
                  requires_shipping: {
                    type: "boolean",
                    description: "Whether the variant requires shipping",
                  },
                  weight: { type: "number", description: "Variant weight" },
                  weight_unit: {
                    type: "string",
                    enum: ["kg", "g", "lb", "oz"],
                    description: "Weight unit (kg, g, lb, oz)",
                  },
                  taxable: {
                    type: "boolean",
                    description: "Whether the variant is taxable",
                  },
                  option1: {
                    type: "string",
                    description: "Option 1 of the variant",
                  },
                },
                required: [
                  "title",
                  "price",
                  "inventory_quantity",
                  "inventory_policy",
                  "fulfillment_service",
                  "requires_shipping",
                  "weight",
                  "weight_unit",
                  "taxable",
                  "option1",
                ],
              },
              description: "List of product variants",
            },
          },
        },
        response: {
          201: {
            description: "Products successfully created, without body",
            type: "null",
          },
          500: {
            description: "An error occurred",
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
    ProductController.create
  );
  app.delete(
    "/shopify/:id",
    {
      schema: {
        description: "Delete a product",
        tags: ["products"],
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "Product id" },
          },
          required: ["id"],
        },
        response: {
          204: {
            description: "Products successfully deleted, without body",
            type: "null",
          },
          404: {
            description: "Product not found",
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
          500: {
            description: "An error occurred",
            type: "object",
            properties: {
              message: { type: "string", description: "Error message" },
            },
          },
        },
      },
    },
    ProductController.destroy
  );
}
