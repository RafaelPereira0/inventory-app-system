import { createContext, useState, type ReactNode } from "react";
import type { CartItem, CartContextType } from "../types/cart";
import { useToast } from "../hooks/useToast";

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const { showToast } = useToast()

    function addToCart(product: CartItem) {
        const existItem = cart.find((item) => item.id === product.id)
        const currentQuantity = existItem?.quantity ?? 0

        if(currentQuantity + product.quantity > product.stock){
            showToast("Estoque insuficiente", "error")
            return
        }

        setCart((prevCart) => {
            if (existItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity} 
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: product.quantity ? product.quantity : 1 }]

        })

        showToast(existItem ? "Quantidade atualizada!" : "Produto adicionado ao carrinho!", "success")
    }

    function removeFromCart(id: number) {
        console.log(`entrou ${id}`)
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
        showToast("Item removido do carrinho", "success")
    }

    function clearCart(isFinishing = false) {
        setCart([])
        if(isFinishing) return showToast("Compra finalizada com sucesso!", "success")
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