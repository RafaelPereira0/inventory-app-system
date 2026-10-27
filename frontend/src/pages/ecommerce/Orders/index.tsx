

import OrderCard from "../../../components/ecommerce/OrderCard";
import { getUserOrders } from "../../../hooks/useOrders";
import type { Order, OrderType } from "../../../types/order";
import "./styles.css";

export default function Pedidos() {
    const {
        data: userOrders,
        isLoading,
        isError,
    } = getUserOrders();
    console.log(userOrders)
    if (isLoading) {
        return (
            <div className="orders-container">
                <p className="orders-loading">Carregando seus pedidos...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="orders-container">
                <p className="orders-error">Não foi possível carregar os pedidos.</p>
            </div>
        );
    }

    return (
        <div className="orders-page-container">
            <h1 className="orders-title">Meus Pedidos</h1>

            {!userOrders || userOrders.length === 0 ? (
                <div className="orders-empty-box">
                    <p>Você ainda não realizou nenhum pedido.</p>
                </div>
            ) : (
                <div className="orders-grid">
                    {userOrders.map((order: Order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}