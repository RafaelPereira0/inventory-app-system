import { useCart } from "../../../hooks/useCart";
import ProductCardCart from "../ProductCardCart";

export default function Carrinho() {
    const { cart, removeFromCart } = useCart()
    console.log(cart)
    return (
        <div>
            <div>
                Produtos em seu carrinho
            </div>

            <div>
                {
                    cart.length === 0 ? (
                        <div>
                            Nenhum produto em seu carrinho
                        </div>
                    ) : <ProductCardCart
                        product={cart}
                    />
                }
            </div>
        </div>
    )
}