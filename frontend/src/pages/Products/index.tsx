import ProductCard from "../../components/ProductCard"
import { getProducts } from "../../hooks/getProducts"

export default function Products() {

    const {
        data: products = [],
        isLoading,
        isError
    } = getProducts()

    console.log(products)

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (isError) {
        return <p>Erro ao buscar produtos</p>
    }

    return (
        <div>
            {products.map(product => (

                <ProductCard 
                    key={product.id}
                    product={product} />

            ))}
        </div>
    )
}