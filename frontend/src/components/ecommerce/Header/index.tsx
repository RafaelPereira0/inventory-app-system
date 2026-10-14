
import { Link } from "react-router-dom";
import { ShoppingCart, UserRound } from "lucide-react";
import "./styles.css";
import { useCart } from "../../../hooks/useCart";

export default function Header() {

    const {totalItems} = useCart()

    return (
        <header className="store-header">
            <Link to="/" className="store-logo">
                Inventory Store
            </Link>

            <nav className="store-nav">
                <Link to="/">Início</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/carrinho" aria-label="Carrinho">
                    <ShoppingCart size={22} />
                    {totalItems > 0 && (
                        <span>{totalItems}</span>
                    )}
                </Link>
                <Link to="/login" aria-label="Minha conta">
                    <UserRound size={22} />
                </Link>
            </nav>
        </header>
    );
}