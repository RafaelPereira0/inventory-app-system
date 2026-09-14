import './styles.css'

export default function Dashboard() {

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
                    <strong>248</strong>
                    <p>Total de produtos</p>
                </div>

                <div className="card">
                    <span className="card-title">Pedidos</span>
                    <strong>47</strong>
                    <p>Pedidos realizados</p>
                </div>

                <div className="card">
                    <span className="card-title">Estoque baixo</span>
                    <strong>12</strong>
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
                        <button>Ver produtos</button>
                    </div>

                    <div className="stock-item">
                        <div>
                            <strong>Notebook Dell</strong>
                            <span>Eletrônicos</span>
                        </div>

                        <span className="stock-low">
                            3 unidades
                        </span>
                    </div>

                    <div className="stock-item">
                        <div>
                            <strong>Mouse Logitech</strong>
                            <span>Eletrônicos</span>
                        </div>

                        <span className="stock-ok">
                            25 unidades
                        </span>
                    </div>

                    <div className="stock-item">
                        <div>
                            <strong>Teclado Mecânico</strong>
                            <span>Eletrônicos</span>
                        </div>

                        <span className="stock-ok">
                            18 unidades
                        </span>
                    </div>

                    <div className="stock-item">
                        <div>
                            <strong>Headset</strong>
                            <span>Eletrônicos</span>
                        </div>

                        <span className="stock-low">
                            2 unidades
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
