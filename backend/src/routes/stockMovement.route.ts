import { Router } from "express";
import stockMovementController from "../controllers/stockMovement.controller";

const stockMovementRoutes = Router()

stockMovementRoutes.post('/create', stockMovementController.createMovement)
stockMovementRoutes.get('/all', stockMovementController.getAllMovements)

export default stockMovementRoutes