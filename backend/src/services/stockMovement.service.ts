import prisma from "../../lib/prisma"
import redis from "../config/redis"
import { CreateStockMovement } from "../types/stockMovement.type"

class StockMovementService {
    async createMovement(data: CreateStockMovement, userId: number) {

        if(data.quantity <= 0) throw new Error("Quantidade inválida")

        const product = await prisma.product.findUnique({
            where: {
                id: data.productId
            }
        })

        if (!product) {
            throw new Error("Produto não encontrado")
        }

        let newQuantity = product.quantity

        if (data.type === "IN") {
            newQuantity += data.quantity
        }

        if (data.type === "OUT") {
            if (product.quantity < data.quantity) {
                throw new Error("Estoque insuficiente")
            }

            newQuantity -= data.quantity
        }

        await prisma.product.update({
            where: {
                id: data.productId
            },
            data: {
                quantity: newQuantity
            }
        })

        await redis.del("stockMovements")

        return await prisma.stockMovement.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                type: data.type,
                userId: userId
            }
        })
    }

    async findAll() {

        const cachedMovements = await redis.get("stockMovements")

        if(cachedMovements){
            return JSON.parse(cachedMovements)
        }

        const movements = await prisma.stockMovement.findMany({
            select: {
                id: true,
                quantity: true,
                type: true,
                product: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        await redis.set("stockMovements", JSON.stringify(movements), {EX: 60})

        return movements
    }
}

export default new StockMovementService()