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
}

export interface StockFormType{
    quantity: number,
    productId: number
}

export interface CreateStockMovementType{
    productId: number,
    type: StockMovement,
    quantity: number
}


export interface StockMovementModal{
    type: StockMovement,
    close: () => void
}