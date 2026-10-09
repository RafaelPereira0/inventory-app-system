import { useState } from "react"

import "./styles.css"
import { getOrders } from "../../hooks/useOrders"
import type { OrderType } from "../../types/order"
import OrderCard from "../../components/OrderCard"
import OrderModal from "../../components/OrderModal"
import { getProducts } from "../../hooks/getProducts"
import { getAllUsers, getCustomers } from "../../hooks/useUsers"
import CreateOrderModal from "../../components/CreateOrderModal"

export default function Orders() {

    const {
        data: orders,
        isLoading,
        isError
    } = getOrders()

    const {
        data: products
    } = getProducts()

    const {
        data: users
    } = getCustomers()

    const [selectedOrder, setSelectedOrder] =
        useState<OrderType | null>(null)

    const [creatingOrder, setCreatingOrder] =
        useState(false)

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
                <button className="order-entry-button" onClick={() => setCreatingOrder(true)}>
                    Novo Pedido
                </button>
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

            {creatingOrder && users && products &&(
                <CreateOrderModal
                    users={users}
                    products={products}
                    close={() => setCreatingOrder(false)}
                />
            )}

        </div>
    )
}
