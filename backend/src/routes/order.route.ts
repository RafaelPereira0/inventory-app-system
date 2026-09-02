import { Router } from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";

const orderRoutes = Router()

orderRoutes.use(authMiddleware)

orderRoutes.post('/create', orderController.createOrder)
orderRoutes.get('/all', orderController.findAllOrders)
orderRoutes.get('/:id', orderController.findOrderById)
orderRoutes.put('/:id', orderController.cancelOrder)


export default orderRoutes