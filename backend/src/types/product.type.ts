import { StockMovementType } from "../../generated/prisma/enums"

export interface ProductType{
    name: string
    description?: string
    price: number
    categoryId: number,
    quantity: number
}

export interface UpdateProductType{
    name?: string,
    description?: string,
    price?: number,
    categoryId? : number
}