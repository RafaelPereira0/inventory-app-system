export interface ProductType {
    id: number,
    name: string
    description?: string
    price: number
    quantity: number
    category: {
        id: number,
        name: string
    }
}

export interface ProductTypeProps{
    product: ProductType,
    // onEdit: (product: ProductType) => void,
    // onDelete: (id: number) => void
}