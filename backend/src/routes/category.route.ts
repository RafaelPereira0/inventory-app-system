import { Router } from "express";

import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { UserRole } from "../../generated/prisma/enums";
import { roleMiddeware } from "../middlewares/role.middleware";

const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Criar categoria
 *     description: Cria uma nova categoria. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Dados inválidos ou categoria já cadastrada
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 */
categoryRoutes.post(
    "/create",
    roleMiddeware(UserRole.ADMIN),
    categoryController.createCategory
);

/**
 * @swagger
 * /category/{id}:
 *   post:
 *     summary: Buscar categoria por ID
 *     description: Retorna uma categoria específica pelo seu ID.
 *     tags:
 *       - Categories
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
 *         description: Categoria encontrada
 *       400:
 *         description: Categoria não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
categoryRoutes.post(
    "/:id",
    categoryController.findCategoryById
);

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Listar categorias
 *     description: Retorna todas as categorias cadastradas.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       401:
 *         description: Token não informado ou inválido
 */
categoryRoutes.get(
    "/all",
    categoryController.findAllCategories
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Excluir categoria
 *     description: Exclui uma categoria. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Categories
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
 *         description: Categoria excluída com sucesso
 *       400:
 *         description: Categoria não encontrada ou não pode ser excluída
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 */
categoryRoutes.delete(
    "/:id",
    roleMiddeware(UserRole.ADMIN),
    categoryController.deleteCategory
);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Atualizar categoria
 *     description: Atualiza uma categoria. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou categoria não encontrada
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 */
categoryRoutes.put(
    "/:id",
    roleMiddeware(UserRole.ADMIN),
    categoryController.updateCategory
);

export default categoryRoutes;