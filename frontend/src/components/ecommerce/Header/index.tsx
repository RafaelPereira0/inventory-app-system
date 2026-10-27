
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    UserRound,
    ChevronDown,
} from "lucide-react";

import "./styles.css";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";

export default function Header() {
    const { totalItems } = useCart();
    const { user } = useAuth();

    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target as Node)
            ) {
                setAccountOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="store-header">
            <Link to="/" className="store-logo">
                Inventory Store
            </Link>

            <nav className="store-nav">
                <Link to="/">Início</Link>
                <Link to="/produtos">Produtos</Link>

                <Link to="/carrinho" className="cart-link" aria-label="Carrinho">
                    <ShoppingCart size={22} />

                    {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                    )}
                </Link>

                <div className="account-dropdown" ref={accountRef}>
                    <button
                        type="button"
                        className="account-trigger"
                        aria-label="Menu da conta"
                        aria-expanded={accountOpen}
                        onClick={() => setAccountOpen((open) => !open)}
                    >
                        <UserRound size={22} />
                        <span>{user ? "Minha conta" : "Entrar"}</span>
                        <ChevronDown
                            size={16}
                            className={accountOpen ? "chevron-open" : ""}
                        />
                    </button>

                    {accountOpen && (
                        <div className="account-menu">
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Entrar
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Criar conta
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Meu perfil
                                    </Link>

                                    <Link
                                        to="/meus-pedidos"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Meus pedidos
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            navigate("/login");
                                        }}
                                    >
                                        Sair
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
