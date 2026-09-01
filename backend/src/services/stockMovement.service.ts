import prisma from "../../lib/prisma"
import { CreateStockMovement } from "../types/stockMovement.type"

class StockMovementService {
    async createMovement(data: CreateStockMovement) {
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

        return await prisma.stockMovement.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                type: data.type
            }
        })
    }

    async findAll(){
        const movements = await prisma.stockMovement.findMany({
            select: {
                id: true,
                quantity: true,
                type: true,
                product: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if(!movements) throw new Error("Nenhuma movimentação encontrada")

        return movements
    }
}

export default new StockMovementService()