/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyProductId` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminGraphqlApiId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedScope` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor` to the `products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "shopifyProductId",
ADD COLUMN     "adminGraphqlApiId" TEXT NOT NULL,
ADD COLUMN     "bodyHtml" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "productType" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedScope" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "templateSuffix" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vendor" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGINT NOT NULL,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "variants" (
    "id" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "position" INTEGER NOT NULL,
    "inventoryPolicy" TEXT NOT NULL,
    "compareAtPrice" DOUBLE PRECISION,
    "option1" TEXT,
    "option2" TEXT,
    "option3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taxable" BOOLEAN NOT NULL,
    "barcode" TEXT,
    "fulfillmentService" TEXT NOT NULL,
    "grams" INTEGER NOT NULL,
    "inventoryManagement" TEXT,
    "requiresShipping" BOOLEAN NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "weightUnit" TEXT NOT NULL,
    "inventoryItemId" BIGINT NOT NULL,
    "inventoryQuantity" INTEGER NOT NULL,
    "oldInventoryQuantity" INTEGER NOT NULL,
    "adminGraphqlApiId" TEXT NOT NULL,
    "imageId" BIGINT,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "values" TEXT[],

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" BIGINT NOT NULL,
    "productId" BIGINT NOT NULL,
    "src" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "variants_id_key" ON "variants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "options_id_key" ON "options"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
