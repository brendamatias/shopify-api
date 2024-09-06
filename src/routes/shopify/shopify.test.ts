import request from "supertest";
import { app } from "@/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const body = {
  title: "Calça Jeans Feminina 222423",
  body_html:
    "<strong>Confortável e estilosa!</strong> Perfeita para o uso diário.",
  vendor: "Minha Loja de Roupas",
  product_type: "Roupas",
  tags: "calça, jeans, feminina, moda",
  status: "active",
  variants: [
    {
      title: "P",
      price: "119.99",
      sku: "CALC-P-JEANS",
      inventory_quantity: 10,
      inventory_policy: "deny",
      fulfillment_service: "manual",
      requires_shipping: true,
      weight: 0.5,
      weight_unit: "kg",
      taxable: true,
      option1: "P",
    },
    {
      title: "M",
      price: "119.99",
      sku: "CALC-M-JEANS",
      inventory_quantity: 15,
      inventory_policy: "deny",
      fulfillment_service: "manual",
      requires_shipping: true,
      weight: 0.55,
      weight_unit: "kg",
      taxable: true,
      option1: "M",
    },
    {
      title: "G",
      price: "119.99",
      sku: "CALC-M-JEANS",
      inventory_quantity: 15,
      inventory_policy: "deny",
      fulfillment_service: "manual",
      requires_shipping: true,
      weight: 0.55,
      weight_unit: "kg",
      taxable: true,
      option1: "G",
    },
  ],
  images: [
    {
      src: "https://down-br.img.susercontent.com/file/f32a413e0a050291f40e96d2a9abb844",
      alt: "Imagem da Calça Jeans Feminina",
    },
  ],
};

const cleanDatabase = async () => {
  await prisma.$transaction([prisma.product.deleteMany()]);
};

beforeEach(async () => {
  await cleanDatabase();
});

describe("Integration: Shopify routes", () => {
  it("should return a list of shopify products", async () => {
    await request(app).post("/products/shopify").send(body);

    const response = await request(app).get(
      "/shopify/products?page=1&limit=10"
    );

    expect(response.status).toBe(200);
  });
});
