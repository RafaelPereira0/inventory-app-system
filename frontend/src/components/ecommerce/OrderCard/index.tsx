import type { OrderItemType } from "../../../types/order";
import "./styles.css";

interface Order {
    id: string | number;
    createdAt: string;
    total: number;
    items: OrderItemType[];
}

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const formattedDate = new Date(order.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <div>
                    <span className="order-id">Pedido #{order.id}</span>
                    <span className="order-date">{formattedDate}</span>
                </div>
            </div>

            <div className="order-items-list">
                {order.items?.map((item) => (
                    <div className="order-item-row">
                        <span>
                            {item.quantity}x {item.product?.name || "Produto"}
                        </span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>

            <div className="order-footer">
                <span>Total do Pedido:</span>
                <strong className="order-total">{formatCurrency(order.total)}</strong>
            </div>
        </div>
    );
}