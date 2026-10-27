import { useState } from "react";
import { useCart } from "../../../hooks/useCart";
import ProductCardCart from "../../../components/ecommerce/ProductCardCart";
import PaymentModal from "../../../components/ecommerce/PaymentModal";
import './styles.css'

export default function Carrinho() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("pix");

    const totalCartPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    function handleFinishOrder(e: React.FormEvent) {
        e.preventDefault();
        clearCart(true);
        setIsModalOpen(false);
    }

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">Produtos em seu carrinho</h1>

            {cart.length === 0 ? (
                <div className="cart-empty-box">
                    Nenhum produto em seu carrinho
                </div>
            ) : (
                <div className="cart-layout-grid">
                    <div className="cart-products-area">
                        <ProductCardCart
                            product={cart}
                            removeItem={removeFromCart}
                        />
                    </div>

                    <div className="cart-summary-card">
                        <h3>Resumo do Pedido</h3>
                        
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>
                                {totalCartPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                        </div>

                        <div className="summary-line total">
                            <span>Total</span>
                            <span>
                                {totalCartPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                        </div>

                        <button 
                            className="global-checkout-btn"
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            )}

            <PaymentModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                finishOrder={handleFinishOrder}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                totalCartPrice={totalCartPrice}
            />
        </div>
    );
}