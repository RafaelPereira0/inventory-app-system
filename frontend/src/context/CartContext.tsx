import { createContext, useState, type ReactNode } from "react";
import type { CartItem, CartContextType } from "../types/cart";
import { useToast } from "../hooks/useToast";

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const { showToast } = useToast()

    function addToCart(product: Omit<CartItem, "quantity">) {
        const existItem = cart.find((item) => item.id === product.id)
        const currentQuantity = existItem?.quantity ?? 0

        if(currentQuantity >= product.stock){
            showToast("Estoque insuficiente", "error")
            return
        }

        setCart((prevCart) => {
            if (existItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1} 
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }]

        })

        showToast(existItem ? "Quantidade atualizada!" : "Produto adicionado ao carrinho!", "success")
    }

    function removeFromCart(id: number) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
        showToast("Item removido do carrinho", "success")
    }

    function clearCart() {
        setCart([])
        showToast("Carrinho limpo!", "success")
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    )
}