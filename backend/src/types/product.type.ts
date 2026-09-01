import { StockMovementType } from "../../generated/prisma/enums"

export interface ProductType{
    name: string
    description?: string
    price: number
    categoryId: number
}