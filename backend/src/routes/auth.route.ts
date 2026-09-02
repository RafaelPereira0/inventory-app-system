import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRoutes = Router()

authRoutes.post('/auth', authController.login)
authRoutes.post('/refresh', authController.refresh)

export default authRoutes