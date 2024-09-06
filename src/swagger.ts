import { env } from "./config";

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shopify API",
      description: "API para gerenciamento de produtos na loja shopify",
      version: "1.0.0",
    },
    servers: [
      {
        url:
          env.NODE_ENV === "production"
            ? "https://shopify-api-n0bq.onrender.com"
            : `http://localhost:${env.PORT}`,
      },
    ],
    tags: [{ name: "Products" }, { name: "Shopify" }],
    components: {
      schemas: {
        VariantShopify: {
          properties: {
            id: {
              type: "integer",
            },
            product_id: {
              type: "integer",
            },
            title: {
              type: "string",
            },
            price: {
              type: "string",
              pattern: "^\\d+(\\.\\d{1,2})?$",
            },
            position: {
              type: "integer",
            },
            inventory_policy: {
              type: "string",
            },
            compare_at_price: {
              type: "string",
              nullable: true,
            },
            option1: {
              type: "string",
            },
            option2: {
              type: "string",
              nullable: true,
            },
            option3: {
              type: "string",
              nullable: true,
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
            taxable: {
              type: "boolean",
            },
            barcode: {
              type: "string",
              nullable: true,
            },
            fulfillment_service: {
              type: "string",
            },
            grams: {
              type: "integer",
            },
            inventory_management: {
              type: "string",
              nullable: true,
            },
            requires_shipping: {
              type: "boolean",
            },
            sku: {
              type: "string",
            },
            weight: {
              type: "number",
            },
            weight_unit: {
              type: "string",
            },
            inventory_item_id: {
              type: "integer",
            },
            inventory_quantity: {
              type: "integer",
            },
            old_inventory_quantity: {
              type: "integer",
            },
            admin_graphql_api_id: {
              type: "string",
            },
            image_id: {
              type: "string",
              nullable: true,
            },
          },
        },
        ImageShopify: {
          properties: {
            id: {
              type: "integer",
            },
            product_id: {
              type: "integer",
            },
            width: {
              type: "integer",
            },
            height: {
              type: "integer",
            },
            src: {
              type: "string",
            },
            alt: {
              type: "string",
            },
            position: {
              type: "integer",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
        },
        OptionShopify: {
          properties: {
            id: {
              type: "integer",
            },
            product_id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            position: {
              type: "integer",
            },
            values: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        ProductShopify: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            title: {
              type: "string",
            },
            body_html: {
              type: "string",
            },
            vendor: {
              type: "string",
            },
            product_type: {
              type: "string",
            },
            handle: {
              type: "string",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
            published_at: {
              type: "string",
              format: "date-time",
            },
            template_suffix: {
              type: "string",
              nullable: true,
            },
            published_scope: {
              type: "string",
            },
            tags: {
              type: "string",
            },
            status: {
              type: "string",
            },
            admin_graphql_api_id: {
              type: "string",
            },
            variants: {
              type: "array",
              items: {
                $ref: "#/components/schemas/VariantShopify",
              },
            },
            options: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OptionShopify",
              },
            },
            images: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ImageShopify",
              },
              nullable: true,
            },
            image: {
              $ref: "#/components/schemas/ImageShopify",
              nullable: true,
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            bodyHtml: {
              type: "string",
              nullable: true,
            },
            vendor: {
              type: "string",
            },
            productType: {
              type: "string",
            },
            handle: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            publishedAt: {
              type: "string",
              format: "date-time",
            },
            templateSuffix: {
              type: "string",
              nullable: true,
            },
            publishedScope: {
              type: "string",
            },
            tags: {
              type: "string",
            },
            status: {
              type: "string",
            },
            adminGraphqlApiId: {
              type: "string",
            },
          },
        },
        ProductDTO: {
          type: "object",
          properties: {
            title: { type: "string" },
            body_html: {
              type: "string",
              nullable: true,
            },
            vendor: { type: "string" },
            product_type: { type: "string" },
            tags: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["active", "draft", "archived"],
            },
            variants: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  price: {
                    type: "string",
                    pattern: "^\\d+(\\.\\d{1,2})?$",
                    default: "0.00",
                  },
                  sku: {
                    type: "string",
                    nullable: true,
                  },
                  inventory_quantity: {
                    type: "integer",
                  },
                  inventory_policy: {
                    type: "string",
                    enum: ["deny", "continue"],
                  },
                  fulfillment_service: {
                    type: "string",
                    default: "manual",
                  },
                  requires_shipping: {
                    type: "boolean",
                  },
                  weight: { type: "number" },
                  weight_unit: {
                    type: "string",
                    enum: ["kg", "g", "lb", "oz"],
                  },
                  taxable: {
                    type: "boolean",
                  },
                  option1: {
                    type: "string",
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
            },
          },
          required: ["title", "body_html"],
        },
        Meta: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            limit: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
          required: ["page", "limit", "total", "totalPages"],
        },
        ProductResponse: {
          type: "object",
          properties: {
            meta: {
              $ref: "#/components/schemas/Meta",
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        ProductShopifyResponse: {
          type: "object",
          properties: {
            meta: {
              $ref: "#/components/schemas/Meta",
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ProductShopify",
              },
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/routes/products/products.ts",
    "./src/routes/shopify/shopify.ts",
  ],
};
