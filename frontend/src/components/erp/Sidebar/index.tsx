import { NavLink } from "react-router-dom"

import './styles.css'
import { useAuth } from "../../../hooks/useAuth"

export default function SideBar() {
    const { user, logout } = useAuth()

    return (
        <aside className="sidebar">
            <h2 className="logo"></h2>

            <nav className="nav">
                <NavLink
                    to="/erp/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active" : "link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink to="/erp/products" className="link">
                    Produtos
                </NavLink>

                {user?.role === "ADMIN" && (
                    <NavLink to="/erp/categories" className="link">
                        Caregorias
                    </NavLink>
                )}

                <NavLink to="/erp/stock" className="link">
                    Estoque
                </NavLink>

                <NavLink to="/erp/orders" className="link">
                    Pedidos
                </NavLink>

                {user?.role === "ADMIN" && (
                    <NavLink to="/erp/users" className="link">
                        Usuários
                    </NavLink>
                )}

                <button className="logout" onClick={logout}>
                    Sair
                </button>
            </nav>
        </aside>
    )
}