import { NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import './styles.css'

export default function SideBar() {
    const { user, logout } = useAuth()

    return (
        <aside className="sidebar">
            <h2 className="logo"></h2>

            <nav className="nav">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : "link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink to="/products" className="link">
                    Produtos
                </NavLink>

                {user?.role === "ADMIN" && (
                    <NavLink to="/categories" className="link">
                        Caregorias
                    </NavLink>
                )}

                <NavLink to="/stock" className="link">
                    Estoque
                </NavLink>

                <NavLink to="/appointments" className="link">
                    Pedidos
                </NavLink>

                {user?.role === "ADMIN" && (
                    <NavLink to="/agenda" className="link">
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