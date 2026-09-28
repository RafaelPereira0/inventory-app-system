import { useState } from "react"

import "./styles.css"
import { getOrders } from "../../hooks/useOrders"
import type { OrderType } from "../../types/order"
import OrderCard from "../../components/OrderCard"
import OrderModal from "../../components/OrderModal"

export default function Orders() {

    const {
        data: orders,
        isLoading,
        isError
    } = getOrders()

    const [selectedOrder, setSelectedOrder] =
        useState<OrderType | null>(null)

    function handleView(order: OrderType) {
        setSelectedOrder(order)
    }

    function handleCloseModal() {
        setSelectedOrder(null)
    }

    if (isLoading) {
        return <div>Carregando Pedidos...</div>
    }

    return (

        <div className="orders-page">

            <div className="orders-header">

                <h1>
                    Pedidos
                </h1>

            </div>

            <div className="orders-grid">

                {isError ? (

                    <p className="orders-error">
                        Erro ao buscar pedidos
                    </p>

                ) : orders?.length === 0 ? (

                    <p className="orders-empty">
                        Nenhum pedido registrado
                    </p>

                ) : (

                    orders?.map((order) => (

                        <OrderCard
                            key={order.id}
                            order={order}
                            onView={handleView}
                        />

                    ))

                )}

            </div>

            {selectedOrder && (

                <OrderModal
                    order={selectedOrder}
                    close={handleCloseModal}
                />

            )}

        </div>
    )
}
