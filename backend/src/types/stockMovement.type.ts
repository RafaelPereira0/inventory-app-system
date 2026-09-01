import { StockMovementType } from "../../generated/prisma/enums"

export interface CreateStockMovement {
    productId: number
    quantity: number
    type: StockMovementType
}