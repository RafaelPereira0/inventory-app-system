import { describe, it, expect, vi, beforeEach } from "vitest"
import prisma from "../../../lib/prisma"
import orderService from "../../services/order.service"
import stockMovementService from "../../services/stockMovement.service"

vi.mock("../../../lib/prisma", () => ({
    default: {
        user: {
            findUnique: vi.fn()
        },
        product: {
            findUnique: vi.fn()
        },
        order: {
            create: vi.fn(),
            findMany: vi.fn(),
            findUnique: vi.fn(),
            update: vi.fn()
        },
        orderItem: {
            findMany: vi.fn(),
            create: vi.fn()
        },
        $transaction: vi.fn()
    }
}))

vi.mock("../../services/stockMovement.service", () => ({
    default: {
        createMovement: vi.fn()
    }
}))

describe("OrderService", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })


    it("shoudl create new order", async () => {
        const user = {
            id: 1,
            name: "user1",
            email: "user@email.com",
            password: "123456",
            role: "CUSTOMER"
        }

        const product = {
            id: 1,
            name: "Mouse",
            price: 60,
            quantity: 10
        }

        const order = {
            id: 1,
            userId: 1,
            total: 120,
            status: "PENDING"
        }

        vi.mocked(prisma.user.findUnique)
            .mockResolvedValue(user as any)

        vi.mocked(prisma.product.findUnique)
            .mockResolvedValue(product as any)

        const tx = {
            order: {
                create: vi.fn()
            },
            orderItem: {
                create: vi.fn()
            }
        }

        tx.order.create.mockResolvedValue(order)
        tx.orderItem.create.mockResolvedValue({
            id: 1,
            orderItem: 1,
            productId: 1,
            quantity: 2,
            price: 120
        })

        vi.mocked(prisma.$transaction)
            .mockImplementation(async (callback: any) => {
                return callback(tx)
            })

        vi.mocked(stockMovementService.createMovement)
            .mockResolvedValue({} as any)

        const result = await orderService.create({
            items: [
                {
                    productId: 1,
                    quantity: 2
                }
            ],
        }, 1
        )

        expect(result).toEqual(order)

        expect(prisma.user.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
                }
            })

        expect(tx.order.create)
            .toHaveBeenCalledWith({
                data: {
                    userId: 1,
                    total: 120,
                    status: "PENDING"
                }
            })

        expect(tx.orderItem.create)
            .toHaveBeenCalledWith({
                data: {
                    orderId: 1,
                    productId: 1,
                    quantity: 2,
                    price: 60
                }
            })

        expect(stockMovementService.createMovement)
            .toHaveBeenCalled()
    })

    it("should find all orders", async () => {
        const orders = [
            {
                id: 1,
                userId: 1,
                status: "PENDING",
                items: [
                    {
                        quantity: 2,
                        price: 100,
                        product: {
                            name: "Mouse"
                        }
                    }
                ]
            },
            {
                id: 2,
                userId: 1,
                status: "PAID",
                items: {
                    quantity: 1,
                    price: 50,
                    product: {
                        name: "notebook"
                    }
                }
            }
        ]

        vi.mocked(prisma.order.findMany)
            .mockResolvedValue(orders as any)

        const result = await orderService.findAll()

        expect(result).toEqual(orders)

        expect(prisma.order.findMany)
            .toHaveBeenCalledWith({
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
    })

    it("should return an order by id", async () => {

        const order = {
            id: 1,
            userId: 1,
            total: 200,
            status: "PENDING"
        }

        vi.mocked(prisma.order.findUnique)
            .mockResolvedValue(order as any)

        const result = await orderService.findById(1)

        expect(result).toEqual(order)

        expect(prisma.order.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
                }
            })
    })

    it("should cancel an order successfully", async () => {

        const order = {
            id: 1,
            userId: 1,
            total: 200,
            status: "PENDING"
        }

        const orderItems = [
            {
                id: 1,
                orderId: 1,
                productId: 10,
                quantity: 2,
                price: 100
            }
        ]

        const canceledOrder = {
            ...order,
            status: "CANCELLED"
        }

        vi.mocked(prisma.order.findUnique)
            .mockResolvedValue(order as any)

        const tx = {
            orderItem: {
                findMany: vi.fn()
            },
            product: {
                update: vi.fn()
            },
            stockMovement: {
                create: vi.fn()
            },
            order: {
                update: vi.fn()
            }
        }

        tx.orderItem.findMany
            .mockResolvedValue(orderItems)

        tx.product.update
            .mockResolvedValue({} as any)

        tx.stockMovement.create
            .mockResolvedValue({} as any)

        tx.order.update
            .mockResolvedValue(canceledOrder)

        vi.mocked(prisma.$transaction)
            .mockImplementation(async (callback: any) => {
                return callback(tx)
            })

        const result = await orderService.cancelOrder(1)

        expect(result)
            .toEqual(canceledOrder)

        expect(tx.orderItem.findMany)
            .toHaveBeenCalledWith({
                where: {
                    orderId: 1
                }
            })

        expect(tx.product.update)
            .toHaveBeenCalledWith({
                where: {
                    id: 10
                },
                data: {
                    quantity: {
                        increment: 2
                    }
                }
            })

        expect(tx.stockMovement.create)
            .toHaveBeenCalledWith({
                data: {
                    productId: 10,
                    quantity: 2,
                    type: "IN"
                }
            })

        expect(tx.order.update)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
                },
                data: {
                    status: "CANCELLED"
                }
            })
    })

    it("should update an order successfully", async () => {

        const order = {
            id: 1,
            userId: 1,
            total: 200,
            status: "PENDING"
        }

        const updatedOrder = {
            ...order,
            status: "PAID"
        }

        vi.mocked(prisma.order.findUnique)
            .mockResolvedValue(order as any)

        vi.mocked(prisma.order.update)
            .mockResolvedValue(updatedOrder as any)

        const result = await orderService.update(1, {
            status: "PAID"
        })

        expect(result)
            .toEqual(updatedOrder)

        expect(prisma.order.findUnique)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
                }
            })

        expect(prisma.order.update)
            .toHaveBeenCalledWith({
                where: {
                    id: 1
                },
                data: {
                    status: "PAID"
                }
            })
    })
})