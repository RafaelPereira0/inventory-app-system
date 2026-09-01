import { Request, Response } from "express";
import orderService from "../services/order.service";
import orderSchema from "../schemas/orderSchema";

class OrderController {

    async createOrder(req: Request, res: Response) {
        try {
            const data = orderSchema.parse(req.body)

            const newOrder = await orderService.create(data)

            return res.status(201).json({ message: "Pedido criado com sucesso", result: newOrder })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAllOrders(req: Request, res: Response) {
        try {
            const orders = await orderService.findAll()

            return res.status(200).json({ resul: orders })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findOrderById(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.id)

            const data = await orderService.findById(orderId)

            return res.status(200).json({ result: data })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async cancelOrder(req: Request, res: Response) {
        try {

            const orderId = Number(req.params.id)

            const result = await orderService.cancelOrder(orderId)

            return res.status(200).json({message: "Pedido cancelado com sucesso", result: result})
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}

export default new OrderController()