import { Router } from "express";

import orderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Criar pedido
 *     description: Cria um novo pedido para o usuário autenticado.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Produto não encontrado ou estoque insuficiente
 *       401:
 *         description: Token não informado ou inválido
 */
orderRoutes.post(
    "/create",
    orderController.createOrder
);

/**
 * @swagger
 * /order/all:
 *   get:
 *     summary: Listar pedidos
 *     description: Retorna todos os pedidos cadastrados.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Token não informado ou inválido
 */
orderRoutes.get(
    "/all",
    orderController.findAllOrders
);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       400:
 *         description: Pedido não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
orderRoutes.get(
    "/:id",
    orderController.findOrderById
);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Cancelar pedido
 *     description: Cancela um pedido e devolve os produtos ao estoque.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 *       400:
 *         description: Pedido não encontrado ou não pode ser cancelado
 *       401:
 *         description: Token não informado ou inválido
 */
orderRoutes.put(
    "/:id",
    orderController.cancelOrder
);

export default orderRoutes;