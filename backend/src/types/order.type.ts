import { OrderType } from "../../generated/prisma/enums"

export interface CreateOrder{
    items: {
        productId: number,
        quantity: number
    }[]
}

export interface UpdateOrder{
    status: OrderType
}