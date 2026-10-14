
import { Link } from "react-router-dom";
import "./styles.css";

export default function Footer() {
    return (
        <footer className="store-footer">
            <div>
                <h3>Inventory Store</h3>
                <p>Qualidade e praticidade para o seu negócio.</p>
            </div>

            <div>
                <h4>Navegação</h4>
                <Link to="/">Início</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/carrinho">Carrinho</Link>
            </div>

            <div>
                <h4>Atendimento</h4>
                <p>Entre em contato conosco.</p>
            </div>
        </footer>
    );
}