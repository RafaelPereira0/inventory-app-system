import { Link } from "react-router-dom";
import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import "./styles.css";
import { getProducts } from "../../../hooks/getProducts";

const navigations = [
    { name: "Todos os produtos", description: "Confira nosso catálogo completo", icon: "📦", path: "/produtos" },
    { name: "Todas as categorias", description: "Os favoritos dos clientes", icon: "✨", path: "/categorias" }
];



export default function Home() {

    const {
        data: products,
        isLoading,
        isError
    } = getProducts();

    console.log(products)
    return (<div className="home-page"> <section className="hero"> <div className="hero-content"> <span className="hero-tag">BEM-VINDO À INVENTORY STORE</span> <h1>Tudo o que você precisa, em um só lugar.</h1> <p>
        Explore nosso catálogo e encontre os produtos ideais para você,
        com praticidade e uma experiência de compra simples. </p> <Link to="/produtos" className="hero-button">
            Explorar produtos <ArrowRight size={19} /> </Link> <div className="hero-benefits"> <span><ShieldCheck size={18} /> Compra segura</span> <span><Package size={18} /> Produtos selecionados</span> <span><Truck size={18} /> Entrega prática</span> </div> </div>

        <div className="hero-illustration" aria-hidden="true">
            <div className="hero-circle">
                <span className="hero-box">📦</span>
                <span className="floating-item floating-item-one">✨</span>
                <span className="floating-item floating-item-two">🛍️</span>
            </div>
            <div className="hero-caption">
                <span className="caption-dot" />
                <div>
                    <strong>Seu próximo favorito</strong>
                    <small>Está esperando por você</small>
                </div>
            </div>
        </div>
    </section>

        <section className="home-section categories-section">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">EXPLORE</span>
                    <h2>Encontre o que procura</h2>
                    <p>Navegue pelas nossas seleções.</p>
                </div>
                <Link to="/produtos" className="text-link">
                    Ver catálogo <ArrowRight size={17} />
                </Link>
            </div>

            <div className="category-grid">
                {navigations.map((category) => (
                    <Link to={category.path} className="category-card" key={category.name}>
                        <span className="category-icon">{category.icon}</span>
                        <div>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </div>
                        <ArrowRight className="category-arrow" size={19} />
                    </Link>
                ))}
            </div>
        </section>

        <section className="home-section products-section">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">NOSSA SELEÇÃO</span>
                    <h2>Produtos em destaque</h2>
                    <p>Algumas sugestões para você começar.</p>
                </div>
                <Link to="/produtos" className="text-link">
                    Ver todos <ArrowRight size={17} />
                </Link>
            </div>

            <div className="product-grid">
                {isLoading ? (
                    <p>Carregando produtos...</p>
                ) : products && products.length === 0 ? (
                    <p>Nenhum produto em destaque.</p>
                ) : (
                    products?.slice(0, 4).map((product) => (
                        <article className="home-product-card" key={product.id}>
                            <div className="home-product-info">
                                <span className="product-category">{product.category.name}</span>
                                <h3>{product.name}</h3>
                                <strong className="product-price">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </strong>
                                <Link to="/produtos" className="product-button">
                                    Ver produto <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))
                )}
            </div>
            <p className="demo-note">
                Os produtos exibidos são exemplos visuais e ainda não representam o estoque real.
            </p>
        </section>

        <section className="home-cta">
            <div>
                <span>INVENTORY STORE</span>
                <h2>Pronto para encontrar seu próximo produto?</h2>
                <p>Explore o catálogo e descubra tudo o que temos para oferecer.</p>
            </div>
            <Link to="/produtos" className="hero-button cta-button">
                Acessar catálogo <ArrowRight size={19} />
            </Link>
        </section>
    </div>


    );
}
