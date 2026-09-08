import { Router } from "express";

import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";

const userRoutes = Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Criar usuário
 *     description: Cria um novo usuário com a role CUSTOMER.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 */
userRoutes.post("/create", userController.createCustomer);

/**
 * @swagger
 * /user/create/manager:
 *   post:
 *     summary: Criar gerente
 *     description: Cria um novo usuário com a role MANAGER. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateManager'
 *     responses:
 *       201:
 *         description: Gerente criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Usuário sem permissão de administrador
 */
userRoutes.post(
    "/create/manager",
    authMiddleware,
    roleMiddeware(UserRole.ADMIN),
    userController.createManager
);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Listar usuários
 *     description: Retorna todos os usuários cadastrados.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Token não informado ou inválido
 */
userRoutes.get(
    "/all",
    authMiddleware,
    userController.findUsers
);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags:
 *       - Users
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
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
userRoutes.get(
    "/:id",
    authMiddleware,
    userController.findUserById
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags:
 *       - Users
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
 *         description: Usuário excluído com sucesso
 *       400:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
userRoutes.delete(
    "/:id",
    authMiddleware,
    userController.deleteUser
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags:
 *       - Users
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
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
userRoutes.put(
    "/:id",
    authMiddleware,
    userController.updateUser
);

export default userRoutes;