import "./styles.css"
import type {ProductTypeProps} from '../../types/products'

export default function ProductCard({
    product,
    onView
}: ProductTypeProps) {
    return (
        <div className="product-card">

            <div className="product-info">
                <h2>{product.name}</h2>
                <div>
                    {product.description}
                </div>
                <div className="product-details">
                    <span>
                        Categoria: {product.category.name}
                    </span>

                    <span>
                        R$ {product.price}
                    </span>

                    <span className={product.quantity <= 5 ? "low-stock" : ""}>
                        Estoque: {product.quantity}
                    </span>
                </div>
            </div>

            <div className="product-actions">
                <button onClick={() => onView(product)} className="view-button">
                    Ver Produto
                </button>
            </div>

        </div>
    )
}
