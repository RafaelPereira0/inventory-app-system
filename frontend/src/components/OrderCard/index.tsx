import type { OrderCardProps } from "../../types/order"
import "./styles.css"

export default function OrderCard({
    order,
    onView
}: OrderCardProps) {
    const total = order.items.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    )
    return (
        <div className="order-card">

            <div className="order-info">

                <h2>Pedido #{order.id}</h2>

                <div className="order-details">

                    <span>
                        Cliente: {order.user.name}
                    </span>

                    <span>
                        Itens: {order.items.length}
                    </span>

                    <span>
                        Total: R$ {total}
                    </span>

                    <span
                        className={`order-status ${order.status.toLowerCase()}`}
                    >
                        Status: {order.status}
                    </span>

                </div>

            </div>

            <div className="order-actions">

                <button
                    onClick={() => onView(order)}
                    className="view-button"
                >
                    Ver Pedido
                </button>

            </div>

        </div>
    )
}