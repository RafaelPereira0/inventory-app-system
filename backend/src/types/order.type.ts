import { OrderType } from "../../generated/prisma/enums"

export interface CreateOrder{
    userId: number,
    items: {
        productId: number,
        quantity: number
    }[]
}