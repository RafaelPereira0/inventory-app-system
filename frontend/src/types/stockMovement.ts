import type { UserRole } from "./user"

export type StockMovement = "IN" | "OUT"

export interface StockMovementType {
    id: number,
    type: StockMovement,
    quantity: number,
    createdAt: string,
    product: {
        id: number,
        name: string
    }
    user: {
        name: string,
        role: UserRole
    }
    reason: "PURCHASE" | "SALE" | "LOSS"
}

export interface StockFormType{
    quantity: number,
    productId: number
    reason: "PURCHASE" | "SALE" | "LOSS"
}

export interface CreateStockMovementType{
    productId: number,
    type: StockMovement,
    quantity: number,
    reason: "PURCHASE" | "SALE" | "LOSS"
}


export interface StockMovementModal{
    type: StockMovement,
    close: () => void
}