import { Router } from "express";
import orderController from "../controllers/order.controller";

const orderRoutes = Router()

orderRoutes.post('/create', orderController.createOrder)
orderRoutes.get('/all', orderController.findAllOrders)
orderRoutes.get('/:id', orderController.findOrderById)


export default orderRoutes