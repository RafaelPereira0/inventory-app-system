import { CreditCard, X } from "lucide-react";
import type { PaymentModalProps } from "../../../types/payment";
import './styles.css'

export default function PaymentModal({
    isOpen,
    setIsModalOpen,
    finishOrder,
    paymentMethod,
    setPaymentMethod,
    totalCartPrice
}: PaymentModalProps) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Finalizar Pagamento</h2>
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={finishOrder} className="modal-form">
                    <p className="modal-total-text">
                        Valor a pagar: <strong>
                            {totalCartPrice.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </strong>
                    </p>

                    <label className="modal-label">Selecione o método de pagamento:</label>

                    <div className="payment-options">
                        <label className={`payment-option ${paymentMethod === 'pix' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="pix"
                                checked={paymentMethod === 'pix'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Pix</span>
                        </label>

                        <label className={`payment-option ${paymentMethod === 'credit' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Cartão de Crédito</span>
                        </label>
                        <label className={`payment-option ${paymentMethod === 'debit' ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="credit"
                                checked={paymentMethod === 'debit'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Cartão de Crédito</span>
                        </label>

                    </div>

                    {paymentMethod === "debit" || paymentMethod === "credit" && (
                        <section className="payment-form">
                            <h2>
                                Pagamento com cartão
                            </h2>
                        </section>
                    )}

                    {paymentMethod === "pix" && (
                        <section className="payment-form">
                            <h2>Pagamento com Pix</h2>

                            {/* O QR Code real aparecerá aqui depois
              que o backend criar o pagamento. */}

                            <div id="pixPayment_container" />

                            <p>
                                Clique em gerar Pix para receber o QR Code
                                e o código copia e cola.
                            </p>
                        </section>
                    )}
                    <button type="submit" className="modal-confirm-btn">
                        <CreditCard size={18} /> Confirmar Pagamento
                    </button>
                </form>
            </div>
        </div>
    );
}