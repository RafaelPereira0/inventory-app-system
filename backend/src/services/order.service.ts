import { CreateOrder } from "../types/order.type";
import prisma from "../../lib/prisma"
import stockMovementService from "./stockMovement.service";

class OrderService {

    async create(data: CreateOrder) {
        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            }
        })

        if (!user) throw new Error("Usuário não encontrado")

        let total = 0
        const products: any = []

        for (const item of data.items) {
            const product = await prisma.product.findUnique({
                where: {
                    id: item.productId
                }
            })

            if (!product) throw new Error(`Produto ${item.productId} não encontrado`)

            if (product.quantity < item.quantity) throw new Error("Estoque insuficiente")

            total += Number(product.price) * item.quantity

            products.push({
                product,
                quantity: item.quantity
            })
        }

        return await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId: data.userId,
                    total: total,
                    status: "PENDING"
                }
            })

            for (const item of products) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price
                    }
                })

                await stockMovementService.createMovement({
                    productId: item.product.id,
                    quantity: item.quantity,
                    type: "OUT"
                })
            }



            return order
        })

    }

    async findAll() {
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                userId: true,
                status: true,
                items: {
                    select: {
                        quantity: true,
                        price: true,
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return orders
    }

    async findById(orderId: number) {
        const existsOrder = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        if (!existsOrder) throw new Error("Pedido não encontrado")

        return existsOrder
    }

    async cancelOrder(orderId: number) {
        const existsOrder = await this.findById(orderId)

        if (!existsOrder) throw new Error("Pedido não encontrado")
        if (existsOrder && (existsOrder.status === "DELIVERED" || existsOrder.status === "CANCELLED")) throw new Error("Não é possível cancelar o pedido")

        return await prisma.$transaction(async (tx) => {
            const orderItems = await tx.orderItem.findMany({
                where: {
                    orderId: orderId
                }
            })

            for (const item of orderItems) {
                await tx.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        quantity: {
                            increment: item.quantity
                        }
                    }
                })

                await tx.stockMovement.create({
                    data: {
                        productId: item.productId,
                        quantity: item.quantity,
                        type: "IN"
                    }
                })
            }

            const canceled = await tx.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: "CANCELLED"
                }
            })

            return canceled
        })
    }
}

export default new OrderService()