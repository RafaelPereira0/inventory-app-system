import type { CartTypeProps } from "../../../types/cart";
import { Trash2 } from "lucide-react";
import './styles.css'

export default function ProductCardCart({
    product,
    removeItem
}: CartTypeProps) {
    return (
        <div className="cart-grid">
            {product.map((item) => {
                const totalPriceItem = item.price * item.quantity;

                return (
                    <article className="cart-product-card" key={item.id}>
                        <div className="cart-product-info">
                            <h3>{item.name}</h3>

                            <strong className="cart-product-price">
                                {totalPriceItem.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </strong>

                            <span className="cart-product-qty-label">
                                Quantidade: <strong>{item.quantity}</strong>
                            </span>

                            <button 
                                className="cart-product-remove-button"
                                type="button"    
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 size={16} />
                                Remover produto
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}