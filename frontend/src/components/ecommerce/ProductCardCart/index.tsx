import type { CartTypeProps } from "../../../types/cart";

export default function ProductCardCart({
    product
}: CartTypeProps) {

    return (
        <div>
            {product.map((item) => (
                <div key={item.id}>
                    <div>
                        <h2>{item.name}</h2>
                    </div>
                    <div>
                        <span>
                            R$ {item.price}
                        </span>
                        <span>
                            Quantidade: {item.quantity}
                        </span>
                    </div>
                    <div>
                        <button>
                            Remover Produto
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}