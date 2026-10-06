import { useState } from "react"
import { useForm } from "react-hook-form"

import "./styles.css"

import type {
    OrderType,
    UpdateOrderType
} from "../../types/order"
import { updateOrder, cancelOrder } from "../../hooks/useOrders"
import { useToast } from "../../hooks/useToast"

interface OrderModalProps {
    order: OrderType
    close: () => void
}

export default function OrderModal({
    order,
    close
}: OrderModalProps) {

    const [editing, setEditing] = useState(false)

    const { showToast } = useToast()
    const updatingOrder = updateOrder()
    const cancelingOrder = cancelOrder()
    const canCancelOrder = order.status !== "DELIVERED" ? true : false
    
    const {
        register,
        handleSubmit
    } = useForm<UpdateOrderType>({
        defaultValues: {
            status: order.status as UpdateOrderType["status"]
        }
    })

    const total = order.items.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    )

    function submitCancelOrder() {

        cancelingOrder.mutate(
            {
                id: order.id
            },
            {
                onSuccess: () => {
                    close()
                    showToast("Pedido cancelado com sucesso", "success")
                },

                onError: () => {
                    showToast(
                        "Erro ao atualizar pedido",
                        "error"
                    )
                }
            }
        )
    }

    function onSubmit(data: UpdateOrderType) {
        updatingOrder.mutate(
            {
                id: order.id,
                data
            },
            {
                onSuccess: () => {
                    close()

                    showToast(
                        "Pedido atualizado com sucesso",
                        "success"
                    )
                },

                onError: () => {
                    showToast(
                        "Erro ao atualizar pedido",
                        "error"
                    )
                }
            }
        )
    }

    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {editing
                            ? `Editar pedido #${order.id}`
                            : `Pedido #${order.id}`
                        }
                    </h2>

                    <button
                        className="close-button"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>

                {!editing ? (

                    <>
                        <div className="modal-content">

                            <p>
                                <strong>Cliente:</strong>{" "}
                                {order.user.name}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {order.status}
                            </p>

                            <p>
                                <strong>Total:</strong>{" "}
                                R$ {total.toFixed(2)}
                            </p>

                            <div className="order-items">

                                <h3>Produtos</h3>

                                {order.items.map((item, index) => (

                                    <div
                                        className="order-item"
                                        key={index}
                                    >

                                        <span>
                                            Produto: {item.product.name}
                                        </span>

                                        <span>
                                            Quantidade: {item.quantity}
                                        </span>

                                        <span>
                                            Preço: R$ {Number(item.price).toFixed(2)}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="modal-actions">

                            <button
                                className="edit-button"
                                onClick={() => setEditing(true)}
                            >
                                Alterar status
                            </button>
                            <button
                                className="cancel-button"
                                onClick={submitCancelOrder}
                                disabled={!canCancelOrder}
                            >
                                Cancelar Pedido
                            </button>

                        </div>
                    </>

                ) : (

                    <form
                        className="edit-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <label>
                            Status
                        </label>

                        <select {...register("status")}>

                            <option value="PENDING">
                                Pendente
                            </option>

                            <option value="PAID">
                                Pago
                            </option>

                            <option value="DELIVERED">
                                Entregue
                            </option>

                            <option value="CANCELLED">
                                Cancelado
                            </option>

                        </select>

                        <div className="form-actions">

                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                            >
                                Cancelar
                            </button>

                            <button type="submit">
                                Salvar
                            </button>

                        </div>

                    </form>
                )}

            </div>

        </div>
    )
}
