export type CartItem ={
    id: number,
    name: string,
    price: number,
    quantity: number,
    stock: number
}

export type CartContextType = {
    cart: CartItem[],
    addToCart: (product: Omit<CartItem, "quantity">) => void,
    removeFromCart: (id: number) => void,
    clearCart: () => void,
    totalItems: number
}

export type CartTypeProps = {
    product: CartItem[]
}