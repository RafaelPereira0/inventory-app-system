import type { ProductType } from "./products"
import type { CustomerType, UserType } from "./user"

export interface OrderType {
    id: number
    userId: number

    user: {
        name: string
    }

    status: string
    items: OrderItemType[]
}

export interface OrderItemType {
    quantity: number
    price: number

    product: {
        name: string
    }
}

export interface UpdateOrderType {
    status: "PAID" | "DELIVERED" | "CANCELLED"
}

export interface OrderCardProps {
    order: OrderType
    onView: (order: OrderType) => void
}

export interface CreateOrderType{
    userId: number,
    items: {
        productId: number,
        quantity: number
    }[]
}

export interface CreateOrderModalProps {
    close: () => void
    products: ProductType[]
    users: CustomerType[]
}
