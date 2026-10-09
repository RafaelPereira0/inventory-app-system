import { useState } from 'react';
import { getProducts } from '../../hooks/getProducts';
import './styles.css'
import { NavLink } from 'react-router-dom';
import { getOrders } from '../../hooks/useOrders';
import { getCustomers } from '../../hooks/useUsers';

export default function Dashboard() {

    const {
        data: products,
        isLoading,
        isError
    } = getProducts()

    const {
        data: orders
    } = getOrders()

    const {
        data: users
    } = getCustomers()

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Visão geral do seu sistema</p>
                </div>
            </div>

            <div className="cards">

                <div className="card">
                    <span className="card-title">Produtos</span>
                    <strong>{products?.length}</strong>
                    <p>Total de produtos</p>
                </div>

                <div className="card">
                    <span className="card-title">Pedidos</span>
                    <strong>{orders?.length}</strong>
                    <p>Pedidos realizados</p>
                </div>

                <div className="card">
                    <span className="card-title">Estoque baixo</span>
                    <strong>{
                        products?.filter((product) => product.quantity < 10)
                            .length ?? 0
                    }</strong>
                    <p>Produtos precisam de atenção</p>
                </div>

                <div className="card">
                    <span className="card-title">Clientes</span>
                    <strong>{users?.length}</strong>
                    <p>Clientes cadastrados</p>
                </div>

            </div>
            <div className="dashboard-content">

                <div className="panel">
                    <div className="panel-header">
                        <h2>Pedidos recentes</h2>
                        <button>
                            <NavLink to="/orders">
                                Ver Todos
                            </NavLink>
                        </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders?.map((order) => {
                                const total = order.items.reduce(
                                    (acc, item) =>
                                        acc + Number(item.price) * item.quantity,
                                    0
                                )

                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>

                                        <td>{order.user.name}</td>

                                        <td>
                                            R$ {total.toFixed(2)}
                                        </td>

                                        <td>
                                            <span className={`status ${order.status.toLocaleLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="panel">
                    <div className="panel-header">
                        <h2>Estoque</h2>
                        <button>
                            <NavLink to='/products'>Ver produtos</NavLink>
                        </button>
                    </div>


                    {products?.slice(0, 4).map((product) => (
                        <div className="stock-item">
                            <div>
                                <strong>
                                    {product.name}
                                </strong>
                                <span>
                                    {product.category.name}
                                </span>
                            </div>
                            <span
                                className={product.quantity < 10 ? "stock-low" : "stock-ok"}
                            >
                                {product.quantity}
                            </span>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}
