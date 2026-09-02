import { Router } from "express";
import stockMovementController from "../controllers/stockMovement.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { roleMiddeware } from "../middlewares/role.middleware";
import { UserRole } from "../../generated/prisma/enums";

const stockMovementRoutes = Router()

stockMovementRoutes.use(authMiddleware)
stockMovementRoutes.use(roleMiddeware(UserRole.ADMIN))

stockMovementRoutes.post('/create', stockMovementController.createMovement)
stockMovementRoutes.get('/all', stockMovementController.getAllMovements)

export default stockMovementRoutes