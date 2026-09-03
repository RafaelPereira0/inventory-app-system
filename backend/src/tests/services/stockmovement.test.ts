import { describe, vi, it, expect, beforeEach } from 'vitest'
import prisma from '../../../lib/prisma'
import stockMovementService from '../../services/stockMovement.service'
import { StockMovementType } from '../../../generated/prisma/enums'

vi.mock("../../../lib/prisma", () => ({
    default: {
        stockMovement: {
            create: vi.fn(),
            findMany: vi.fn()
        },
        product: {
            findUnique: vi.fn(),
            update: vi.fn()
        }
    }
}))


describe("StockMovement tests", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should create new entry stockmovement", async () => {
        const data = {
            productId: 1,
            quantity: 10,
            type: StockMovementType.IN
        }

        const product = {
            id: 1,
            name: "testing product",
            quantity: 10
        }

        const movement = {
            id: 1,
            productId: 1,
            quantity: 10,
            type: "IN"
        }

        vi.mocked(prisma.product.findUnique)
            .mockResolvedValue(product as any)

        vi.mocked(prisma.product.update)
            .mockResolvedValue({
                ...product,
                quantity: 20
            } as any)

        vi.mocked(prisma.stockMovement.create)
            .mockResolvedValue(movement as any)

        const result = await stockMovementService.createMovement(data)

        expect(prisma.product.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    id: data.productId
                }
            })

        expect(prisma.product.update).toHaveBeenCalledWith({
            where: {
                id: data.productId
            },
            data: {
                quantity: 20
            }
        })

        expect(prisma.stockMovement.create).toHaveBeenCalledWith({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                type: data.type
            }
        })

        expect(result).toEqual(movement)
    })

    it("should find all stockmovements", async () => {
        const movements = [
            {
                id: 1,
                quantity: 10,
                type: StockMovementType.IN,
                product: {
                    name: "testing product"
                }
            },
            {
                id: 2,
                quantity: 10,
                type: StockMovementType.OUT,
                product: {
                    name: "testing product2"
                }
            }
        ]

        vi.mocked(prisma.stockMovement.findMany)
            .mockResolvedValue(movements as any)

        const result = await stockMovementService.findAll()

        expect(prisma.stockMovement.findMany)
            .toHaveBeenCalled()

        expect(result).toEqual(movements)
    })

    it("findall - should throw error when stockmovement do not exists", async () => {
        vi.mocked(prisma.stockMovement.findMany)
            .mockResolvedValue([])

        await expect(stockMovementService.findAll())
            .rejects.toThrow("Nenhuma movimentação encontrada")

    })

    it("create - should throw error when product not found", async () => {
        const movement = {
            productId: 999,
            quantity: 10,
            type: StockMovementType.IN
        }

        vi.mocked(prisma.product.findUnique)
            .mockResolvedValue(null)

        await expect(stockMovementService.createMovement(movement))
            .rejects.toThrow("Produto não encontrado")
    })

    it("create - should throw error when quantity greatter than stock", async () => {
        const movement = {
            productId: 1,
            quantity: 100,
            type: StockMovementType.OUT
        }

        vi.mocked(prisma.product.findUnique)
            .mockResolvedValue({
                id: 1,
                quantity: 1,
                name: "testing product",
                description: "testing description",
                price: 10,
                categoryId: 1
            } as any)

        await expect(stockMovementService.createMovement(movement))
            .rejects.toThrow("Estoque insuficiente")
    })

    it("create - should throw error when quantity is invalid", async () => {
        const movement = {
            id: 1,
            quantity: -10,
            type: StockMovementType.IN
        } as any

        await expect(stockMovementService.createMovement(movement))
            .rejects.toThrow("Quantidade inválida")
    })
})