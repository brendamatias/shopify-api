import { type FastifyInstance } from "fastify";
import { ShopifyController } from "../controllers/shopify.controller";

export async function shopifyRoutes(app: FastifyInstance) {
  app.get(
    "/products",
    {
      schema: {
        description: "Shopify products list",
        tags: ["shopify"],
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
                      type: "integer",
                      description: "Unique identifier of the product",
                    },
                    title: {
                      type: "string",
                      description: "Title of the product",
                    },
                    body_html: {
                      type: "string",
                      description: "HTML description of the product",
                    },
                    vendor: {
                      type: "string",
                      description: "Vendor or store name",
                    },
                    product_type: {
                      type: "string",
                      description: "Type or category of the product",
                    },
                    handle: {
                      type: "string",
                      description: "Handle used for the product URL",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      description: "Date and time when the product was created",
                    },
                    updated_at: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the product was last updated",
                    },
                    published_at: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the product was published",
                    },
                    template_suffix: {
                      type: "string",
                      description: "Suffix for the product template",
                      nullable: true,
                    },
                    published_scope: {
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
                    admin_graphql_api_id: {
                      type: "string",
                      description: "GraphQL API ID for the product",
                    },
                    variants: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            description: "Unique identifier of the variant",
                          },
                          product_id: {
                            type: "integer",
                            description: "ID of the associated product",
                          },
                          title: {
                            type: "string",
                            description: "Title of the variant",
                          },
                          price: {
                            type: "string",
                            description: "Price of the variant",
                            pattern: "^\\d+(\\.\\d{1,2})?$",
                          },
                          position: {
                            type: "integer",
                            description: "Position of the variant",
                          },
                          inventory_policy: {
                            type: "string",
                            description:
                              "Inventory policy for the variant (e.g., deny, continue)",
                          },
                          compare_at_price: {
                            type: "string",
                            description: "Compare at price of the variant",
                            nullable: true,
                          },
                          option1: {
                            type: "string",
                            description: "Option 1 of the variant",
                          },
                          option2: {
                            type: "string",
                            description: "Option 2 of the variant",
                            nullable: true,
                          },
                          option3: {
                            type: "string",
                            description: "Option 3 of the variant",
                            nullable: true,
                          },
                          created_at: {
                            type: "string",
                            format: "date-time",
                            description:
                              "Date and time when the variant was created",
                          },
                          updated_at: {
                            type: "string",
                            format: "date-time",
                            description:
                              "Date and time when the variant was last updated",
                          },
                          taxable: {
                            type: "boolean",
                            description: "Whether the variant is taxable",
                          },
                          barcode: {
                            type: "string",
                            description: "Barcode of the variant",
                            nullable: true,
                          },
                          fulfillment_service: {
                            type: "string",
                            description: "Fulfillment service for the variant",
                          },
                          grams: {
                            type: "integer",
                            description: "Weight in grams",
                          },
                          inventory_management: {
                            type: "string",
                            description:
                              "Inventory management system for the variant",
                            nullable: true,
                          },
                          requires_shipping: {
                            type: "boolean",
                            description:
                              "Whether the variant requires shipping",
                          },
                          sku: {
                            type: "string",
                            description: "SKU of the variant",
                          },
                          weight: {
                            type: "number",
                            description: "Weight of the variant",
                          },
                          weight_unit: {
                            type: "string",
                            description: "Unit of weight (e.g., kg, g, lb, oz)",
                          },
                          inventory_item_id: {
                            type: "integer",
                            description: "Inventory item ID",
                          },
                          inventory_quantity: {
                            type: "integer",
                            description: "Current inventory quantity",
                          },
                          old_inventory_quantity: {
                            type: "integer",
                            description: "Previous inventory quantity",
                          },
                          admin_graphql_api_id: {
                            type: "string",
                            description: "GraphQL API ID for the variant",
                          },
                          image_id: {
                            type: "string",
                            description: "ID of the associated image",
                            nullable: true,
                          },
                        },
                      },
                      description: "List of product variants",
                      nullable: true,
                    },
                    options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            description: "Unique identifier of the option",
                          },
                          product_id: {
                            type: "integer",
                            description: "ID of the associated product",
                          },
                          name: {
                            type: "string",
                            description: "Name of the option",
                          },
                          position: {
                            type: "integer",
                            description: "Position of the option",
                          },
                          values: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                            description: "List of values for the option",
                          },
                        },
                      },
                      description: "List of product options",
                      nullable: true,
                    },
                    images: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            description: "Unique identifier of the image",
                          },
                          product_id: {
                            type: "integer",
                            description: "ID of the associated product",
                          },
                          width: {
                            type: "integer",
                            description: "Width of the image",
                          },
                          height: {
                            type: "integer",
                            description: "Height of the image",
                          },
                          src: {
                            type: "string",
                            description: "Source of the image",
                          },
                          alt: {
                            type: "string",
                            description: "Alt of the image",
                          },
                          position: {
                            type: "integer",
                            description: "Position of the image",
                          },
                          created_at: {
                            type: "string",
                            format: "date-time",
                            description:
                              "Date and time when the image was created",
                          },
                          updated_at: {
                            type: "string",
                            format: "date-time",
                            description:
                              "Date and time when the image was last updated",
                          },
                        },
                      },
                      description: "List of product images",
                      nullable: true,
                    },
                    image: {
                      type: "object",
                      description: "Primary product image",
                      properties: {
                        id: {
                          type: "integer",
                          description: "Unique identifier of the image",
                        },
                        product_id: {
                          type: "integer",
                          description: "ID of the associated product",
                        },
                        width: {
                          type: "integer",
                          description: "Width of the image",
                        },
                        height: {
                          type: "integer",
                          description: "Height of the image",
                        },
                        src: {
                          type: "string",
                          description: "Source of the image",
                        },
                        alt: {
                          type: "string",
                          description: "Alt of the image",
                        },
                        position: {
                          type: "integer",
                          description: "Position of the image",
                        },
                        created_at: {
                          type: "string",
                          format: "date-time",
                          description:
                            "Date and time when the image was created",
                        },
                        updated_at: {
                          type: "string",
                          format: "date-time",
                          description:
                            "Date and time when the image was last updated",
                        },
                      },
                      nullable: true,
                    },
                  },
                },
                description: "Array of products",
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
    ShopifyController.get
  );
  app.get(
    "/products/:id",
    {
      schema: {
        description: "Shopify products list",
        tags: ["shopify"],
        response: {
          200: {
            properties: {
              id: {
                type: "integer",
                description: "Unique identifier of the product",
              },
              title: {
                type: "string",
                description: "Title of the product",
              },
              body_html: {
                type: "string",
                description: "HTML description of the product",
              },
              vendor: {
                type: "string",
                description: "Vendor or store name",
              },
              product_type: {
                type: "string",
                description: "Type or category of the product",
              },
              handle: {
                type: "string",
                description: "Handle used for the product URL",
              },
              created_at: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was created",
              },
              updated_at: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was last updated",
              },
              published_at: {
                type: "string",
                format: "date-time",
                description: "Date and time when the product was published",
              },
              template_suffix: {
                type: "string",
                description: "Suffix for the product template",
                nullable: true,
              },
              published_scope: {
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
              admin_graphql_api_id: {
                type: "string",
                description: "GraphQL API ID for the product",
              },
              variants: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "Unique identifier of the variant",
                    },
                    product_id: {
                      type: "integer",
                      description: "ID of the associated product",
                    },
                    title: {
                      type: "string",
                      description: "Title of the variant",
                    },
                    price: {
                      type: "string",
                      description: "Price of the variant",
                      pattern: "^\\d+(\\.\\d{1,2})?$",
                    },
                    position: {
                      type: "integer",
                      description: "Position of the variant",
                    },
                    inventory_policy: {
                      type: "string",
                      description:
                        "Inventory policy for the variant (e.g., deny, continue)",
                    },
                    compare_at_price: {
                      type: "string",
                      description: "Compare at price of the variant",
                      nullable: true,
                    },
                    option1: {
                      type: "string",
                      description: "Option 1 of the variant",
                    },
                    option2: {
                      type: "string",
                      description: "Option 2 of the variant",
                      nullable: true,
                    },
                    option3: {
                      type: "string",
                      description: "Option 3 of the variant",
                      nullable: true,
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      description: "Date and time when the variant was created",
                    },
                    updated_at: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the variant was last updated",
                    },
                    taxable: {
                      type: "boolean",
                      description: "Whether the variant is taxable",
                    },
                    barcode: {
                      type: "string",
                      description: "Barcode of the variant",
                      nullable: true,
                    },
                    fulfillment_service: {
                      type: "string",
                      description: "Fulfillment service for the variant",
                    },
                    grams: {
                      type: "integer",
                      description: "Weight in grams",
                    },
                    inventory_management: {
                      type: "string",
                      description:
                        "Inventory management system for the variant",
                      nullable: true,
                    },
                    requires_shipping: {
                      type: "boolean",
                      description: "Whether the variant requires shipping",
                    },
                    sku: {
                      type: "string",
                      description: "SKU of the variant",
                    },
                    weight: {
                      type: "number",
                      description: "Weight of the variant",
                    },
                    weight_unit: {
                      type: "string",
                      description: "Unit of weight (e.g., kg, g, lb, oz)",
                    },
                    inventory_item_id: {
                      type: "integer",
                      description: "Inventory item ID",
                    },
                    inventory_quantity: {
                      type: "integer",
                      description: "Current inventory quantity",
                    },
                    old_inventory_quantity: {
                      type: "integer",
                      description: "Previous inventory quantity",
                    },
                    admin_graphql_api_id: {
                      type: "string",
                      description: "GraphQL API ID for the variant",
                    },
                    image_id: {
                      type: "string",
                      description: "ID of the associated image",
                      nullable: true,
                    },
                  },
                },
                description: "List of product variants",
                nullable: true,
              },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "Unique identifier of the option",
                    },
                    product_id: {
                      type: "integer",
                      description: "ID of the associated product",
                    },
                    name: {
                      type: "string",
                      description: "Name of the option",
                    },
                    position: {
                      type: "integer",
                      description: "Position of the option",
                    },
                    values: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      description: "List of values for the option",
                    },
                  },
                },
                description: "List of product options",
                nullable: true,
              },
              images: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "Unique identifier of the image",
                    },
                    product_id: {
                      type: "integer",
                      description: "ID of the associated product",
                    },
                    width: {
                      type: "integer",
                      description: "Width of the image",
                    },
                    height: {
                      type: "integer",
                      description: "Height of the image",
                    },
                    src: {
                      type: "string",
                      description: "Source of the image",
                    },
                    alt: {
                      type: "string",
                      description: "Alt of the image",
                    },
                    position: {
                      type: "integer",
                      description: "Position of the image",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                      description: "Date and time when the image was created",
                    },
                    updated_at: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Date and time when the image was last updated",
                    },
                  },
                },
                description: "List of product images",
                nullable: true,
              },
              image: {
                type: "object",
                description: "Primary product image",
                properties: {
                  id: {
                    type: "integer",
                    description: "Unique identifier of the image",
                  },
                  product_id: {
                    type: "integer",
                    description: "ID of the associated product",
                  },
                  width: {
                    type: "integer",
                    description: "Width of the image",
                  },
                  height: {
                    type: "integer",
                    description: "Height of the image",
                  },
                  src: {
                    type: "string",
                    description: "Source of the image",
                  },
                  alt: {
                    type: "string",
                    description: "Alt of the image",
                  },
                  position: {
                    type: "integer",
                    description: "Position of the image",
                  },
                  created_at: {
                    type: "string",
                    format: "date-time",
                    description: "Date and time when the image was created",
                  },
                  updated_at: {
                    type: "string",
                    format: "date-time",
                    description:
                      "Date and time when the image was last updated",
                  },
                },
                nullable: true,
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
    ShopifyController.getById
  );
  app.post(
    "/products/sync",
    {
      schema: {
        description: "Sync shopify products with local bank",
        tags: ["shopify"],
        response: {
          204: {
            description: "Products successfully synchronized, without body",
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
    ShopifyController.sync
  );
}
