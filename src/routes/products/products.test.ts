import request from "supertest";
import { app } from "@/app";
import { PrismaClient } from "@prisma/client";
import { session, shopify } from "@/config";
import { DataType } from "@shopify/shopify-api";

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

const createProduct = async () => {
  const body = {
    id: 1,
    title: "Calça Jeans Feminina 222423",
    vendor: "Minha Loja de Roupas",
    productType: "Roupas",
    handle: "123",
    tags: "calça, jeans, feminina, moda",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedScope: "",
    adminGraphqlApiId: "lorem_ipsum",
  };

  return await prisma.product.create({
    data: body,
  });
};

const cleanDatabase = async () => {
  await prisma.$transaction([prisma.product.deleteMany()]);
};

beforeEach(async () => {
  await cleanDatabase();
});

describe("Integration: Products routes", () => {
  it("should create a product", async () => {
    await request(app).post("/products/shopify").send(body);
    const list = await request(app).get("/products?page=1&limit=10");
    const response = await request(app).get(
      `/products/${list.body.data[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(body.title);
  });

  it("should return a list of products", async () => {
    const product = await createProduct();

    const response = await request(app).get("/products?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].title).toBe(product.title);
    expect(response.body.data[0].vendor).toBe(product.vendor);
    expect(response.body.data[0].productType).toBe(product.productType);
    expect(response.body.data[0].handle).toBe(product.handle);
    expect(response.body.data[0].status).toBe(product.status);
    expect(response.body.data[0].tags).toBe(product.tags);
    expect(response.body.data[0].adminGraphqlApiId).toBe(
      product.adminGraphqlApiId
    );
  });

  it("should return a product by id", async () => {
    await request(app).post("/products/shopify").send(body);
    const list = await request(app).get("/products?page=1&limit=10");
    const response = await request(app).get(
      `/products/${list.body.data[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(body.title);
  });

  it("should create product in database when product exists in shopify", async () => {
    let count = await prisma.product.count();

    expect(count).toBe(0);

    const client = new shopify.clients.Rest({ session });

    const response = await client.post({
      path: "products",
      data: { product: body },
      type: DataType.JSON,
    });

    const product = await request(app).get(
      `/products/${response.body.product.id}`
    );

    count = await prisma.product.count();

    expect(count).toBe(1);
    expect(product.body.title).toBe(response.body.product.title);
  });

  it("should return status code 404 when no product is found", async () => {
    const response = await request(app).get(`/products/999999`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Produto não encontrado");
  });

  it("should delete a product", async () => {
    const product = await createProduct();
    const response = await request(app).delete(`/products/${product.id}`);

    expect(response.status).toBe(204);
  });
});
