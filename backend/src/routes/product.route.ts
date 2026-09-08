import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";

const productRoutes = Router();

productRoutes.use(authMiddleware);

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Listar produtos
 *     description: Retorna todos os produtos cadastrados.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 *       401:
 *         description: Token não informado ou inválido
 *
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.get(
    "/all",
    productController.findAllProducts
);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     description: Retorna um produto específico pelo seu ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       401:
 *         description: Token não informado ou inválido
 *
 *       404:
 *         description: Produto não encontrado
 *
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.get(
    "/:id",
    productController.findProductById
);

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Criar produto
 *     description: Cria um novo produto no sistema.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - quantity
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Gamer
 *
 *               description:
 *                 type: string
 *                 example: Mouse gamer RGB
 *
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 149.90
 *
 *               quantity:
 *                 type: integer
 *                 example: 20
 *
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *
 *       400:
 *         description: Dados inválidos
 *
 *       401:
 *         description: Token não informado ou inválido
 *
 *       403:
 *         description: Usuário sem permissão
 *
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.post(
    "/create",
    roleMiddeware(UserRole.ADMIN),
    productController.createProduct
);

/**
 * @swagger
 * /product/{id}:
 *   post:
 *     summary: Deletar produto
 *     description: Remove um produto pelo seu ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *
 *       401:
 *         description: Token não informado ou inválido
 *
 *       403:
 *         description: Usuário sem permissão
 *
 *       404:
 *         description: Produto não encontrado
 *
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.post(
    "/:id",
    roleMiddeware(UserRole.ADMIN),
    productController.deleteProduct
);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualizar produto
 *     description: Atualiza os dados de um produto existente.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Gamer Pro
 *
 *               description:
 *                 type: string
 *                 example: Mouse gamer RGB atualizado
 *
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 179.90
 *
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *
 *       400:
 *         description: Dados inválidos
 *
 *       401:
 *         description: Token não informado ou inválido
 *
 *       403:
 *         description: Usuário sem permissão
 *
 *       404:
 *         description: Produto não encontrado
 *
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.put(
    "/:id",
    roleMiddeware(UserRole.ADMIN),
    productController.updateProduct
);

export default productRoutes;