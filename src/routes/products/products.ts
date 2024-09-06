/**
 * @openapi
 * /products:
 *   get:
 *     summary: List products from database
 *     description: Returns the list of products with pagination
 *     tags:
 *       - Products
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
 *               $ref: '#/components/schemas/ProductResponse'
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
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID and sync with Shopify
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
 *               $ref: '#/components/schemas/Product'
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
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete the product on Shopify and in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully, no content in the response.
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
 * /products/shopify:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product on Shopify and in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          type: object
 *          properties:
 *          schema:
 *            $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       201:
 *         description: Product created successfully, no content in the response.
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
import { ProductController } from "@/controllers";
import express from "express";

const router = express.Router();

router.get("/", ProductController.get);
router.get("/:id", ProductController.getById);
router.delete("/:id", ProductController.destroy);

router.post("/shopify", ProductController.create);

export default router;
