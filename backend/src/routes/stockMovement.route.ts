import { Router } from "express";

import stockMovementController from "../controllers/stockMovement.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";

const stockMovementRoutes = Router();

stockMovementRoutes.use(authMiddleware);
stockMovementRoutes.use(roleMiddeware(UserRole.ADMIN));

/**
 * @swagger
 * /movement/create:
 *   post:
 *     summary: Registrar movimentação de estoque
 *     description: Registra uma entrada ou saída de estoque. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Stock Movements
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *               - type
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               type:
 *                 type: string
 *                 enum:
 *                   - IN
 *                   - OUT
 *                 example: IN
 *     responses:
 *       201:
 *         description: Movimentação registrada com sucesso
 *       400:
 *         description: Dados inválidos ou estoque insuficiente
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 */
stockMovementRoutes.post(
    "/create",
    stockMovementController.createMovement
);

/**
 * @swagger
 * /movement/all:
 *   get:
 *     summary: Listar movimentações de estoque
 *     description: Retorna todas as movimentações de estoque, ordenadas pelas mais recentes.
 *     tags:
 *       - Stock Movements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StockMovement'
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 *       500:
 *         description: Erro interno do servidor
 */
stockMovementRoutes.get(
    "/all",
    stockMovementController.getAllMovements
);

export default stockMovementRoutes;