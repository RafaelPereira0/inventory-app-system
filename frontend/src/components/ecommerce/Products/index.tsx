import { useState } from "react";
import { Search, ShoppingCart, Package, SlidersHorizontal } from "lucide-react";
import { getProducts } from "../../../hooks/getProducts";
import "./styles.css";
import { useCart } from "../../../hooks/useCart";

export default function Produtos() {
    const {
        data: products,
        isLoading,
        isError,
    } = getProducts();

    const {addToCart} = useCart()

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name");

    const filteredProducts = (products ?? [])
        .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === "price-asc") {
                return Number(a.price) - Number(b.price);
            }

            if (sort === "price-desc") {
                return Number(b.price) - Number(a.price);
            }

            return a.name.localeCompare(b.name);
        });

    if (isLoading) {
        return (
            <main className="catalog-page">
                <div className="catalog-message">
                    <div className="catalog-spinner" />
                    <p>Carregando produtos...</p>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="catalog-page">
                <div className="catalog-message">
                    <Package size={42} />
                    <h2>Não foi possível carregar os produtos</h2>
                    <p>Tente novamente em alguns instantes.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="catalog-page">
            <section className="catalog-banner">
                <div>
                    <span className="catalog-eyebrow">INVENTORY STORE</span>
                    <h1>Nosso catálogo</h1>
                    <p>
                        Encontre os produtos que você procura e confira
                        tudo o que temos disponível.
                    </p>
                </div>

                <div className="catalog-banner-icon">
                    <ShoppingCart size={66} strokeWidth={1.3} />
                </div>
            </section>

            <section className="catalog-content">
                <div className="catalog-heading">
                    <div>
                        <h2>Todos os produtos</h2>
                        <p>
                            {filteredProducts.length}{" "}
                            {filteredProducts.length === 1
                                ? "produto encontrado"
                                : "produtos encontrados"}
                        </p>
                    </div>
                </div>

                <div className="catalog-toolbar">
                    <label className="catalog-search">
                        <Search size={19} />
                        <input
                            type="search"
                            placeholder="Buscar produto pelo nome..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </label>

                    <label className="catalog-sort">
                        <SlidersHorizontal size={18} />
                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                        >
                            <option value="name">Nome: A–Z</option>
                            <option value="price-asc">Menor preço</option>
                            <option value="price-desc">Maior preço</option>
                        </select>
                    </label>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="catalog-grid">
                        {filteredProducts.map((product) => (
                            <article
                                className="catalog-product-card"
                                key={product.id}
                            >
                                <div className="catalog-product-image">
                                    <Package size={58} strokeWidth={1.2} />
                                </div>

                                <div className="catalog-product-info">
                                    <span className="catalog-product-category">
                                        {product.category?.name ?? "Produto"}
                                    </span>

                                    <h3>{product.name}</h3>

                                    <strong className="catalog-product-price">
                                        {Number(product.price).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            }
                                        )}
                                    </strong>

                                    <span className="catalog-stock">
                                        {product.quantity > 0
                                            ? `Disponível ${product.quantity}`
                                            : "Indisponível"}
                                    </span>

                                    <button
                                        className="catalog-product-button"
                                        type="button"
                                        disabled={product.quantity <= 0}
                                        onClick={() =>
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                stock: product.quantity
                                            })
                                        }
                                    >
                                        <ShoppingCart size={17} />
                                        {product.quantity > 0
                                            ? "Adicionar ao carrinho"
                                            : "Sem estoque"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="catalog-empty">
                        <Package size={48} strokeWidth={1.3} />
                        <h3>Nenhum produto encontrado</h3>
                        <p>
                            Tente buscar por outro nome ou limpar sua pesquisa.
                        </p>

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                            >
                                Limpar pesquisa
                            </button>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
