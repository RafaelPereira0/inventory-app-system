import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRoutes = Router();

/**
 * @swagger
 * /login/auth:
 *   post:
 *     summary: Realizar login
 *     description: Autentica o usuário através do email e senha.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Email ou senha inválidos
 */
authRoutes.post("/auth", authController.login);

/**
 * @swagger
 * /login/refresh:
 *   post:
 *     summary: Renovar access token
 *     description: Gera um novo access token utilizando o refresh token armazenado no cookie.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Access token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Refresh token ausente ou inválido
 */
authRoutes.post("/refresh", authController.refresh);

authRoutes.post("/logout", authController.logout)

export default authRoutes;