/**
 * @openapi
 * /shopify/products:
 *   get:
 *     summary: Get a list of products shopify
 *     description: Retrieve a list of products with pagination.
 *     tags:
 *       - Shopify
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of products with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductShopifyResponse'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *
 * /shopify/products/{id}:
 *   get:
 *     tags:
 *       - Shopify
 *     summary: Get a product shopify by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductShopify'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *
 *
 * /shopify/products/sync:
 *   post:
 *     tags:
 *       - Shopify
 *     summary: Sync shopify products with local bank
 *     responses:
 *       204:
 *         description: Products successfully synchronized, without body.
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *
 */
import { ShopifyController } from "@/controllers";
import express from "express";

const router = express.Router();

router.get("", ShopifyController.get);
router.get("/:id", ShopifyController.getById);
router.post("/sync", ShopifyController.sync);

export default router;
