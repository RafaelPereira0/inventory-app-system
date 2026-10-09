import { StockMovementReason, StockMovementType } from "../../generated/prisma/enums"

export interface CreateStockMovement {
    productId: number
    reason: StockMovementReason
    quantity: number
    type: StockMovementType,
    orderId: number
}