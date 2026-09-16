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
    onView: (product: ProductType) => void
}

export interface ProductModelProps{
    product: ProductType,
    close: () => void
}

export interface UpdateProductType{
    name? :string,
    description?: string,
    price?: number,
    quantity?: number,
    categoryId?: number
}