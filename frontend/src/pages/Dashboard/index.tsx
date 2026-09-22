import { useState } from 'react';
import { getProducts } from '../../hooks/getProducts';
import './styles.css'
import { NavLink } from 'react-router-dom';

export default function Dashboard() {

    const {
        data: products,
        isLoading,
        isError
    } = getProducts()

    const [lowStocks, setLowStock] = useState(0)

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
                    <strong>47</strong>
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
                    <span className="card-title">Usuários</span>
                    <strong>23</strong>
                    <p>Usuários cadastrados</p>
                </div>

            </div>
            <div className="dashboard-content">

                <div className="panel">
                    <div className="panel-header">
                        <h2>Pedidos recentes</h2>
                        <button>Ver todos</button>
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
                            <tr>
                                <td>#1024</td>
                                <td>João Silva</td>
                                <td>R$ 259,90</td>
                                <td>
                                    <span className="status success">
                                        Entregue
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>#1023</td>
                                <td>Maria Souza</td>
                                <td>R$ 189,90</td>
                                <td>
                                    <span className="status pending">
                                        Pendente
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>#1022</td>
                                <td>Carlos Lima</td>
                                <td>R$ 349,90</td>
                                <td>
                                    <span className="status progress">
                                        Em andamento
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>#1021</td>
                                <td>Ana Oliveira</td>
                                <td>R$ 79,90</td>
                                <td>
                                    <span className="status success">
                                        Entregue
                                    </span>
                                </td>
                            </tr>
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
