export type CartItem ={
    id: number,
    name: string,
    price: number,
    quantity: number,
    stock: number
}

export type CartContextType = {
    cart: CartItem[],
    addToCart: (product: CartItem) => void,
    removeFromCart: (id: number) => void,
    clearCart: (isFinishg?: boolean) => void,
    totalItems: number
}

export type CartTypeProps = {
    product: CartItem[],
    removeItem: (id:number) => void
}