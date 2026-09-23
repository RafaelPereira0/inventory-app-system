import { useState } from "react"

import ProductCard from "../../components/ProductCard"
import ProductModal from "../../components/ProductModal"

import { getProducts } from "../../hooks/getProducts"

import type { ProductType } from "../../types/products"

import "./styles.css"


export default function Products() {

    const {
        data: products,
        isLoading,
        isError
    } = getProducts()


    const [selectedProduct, setSelectedProduct] =
        useState<ProductType | null>(null)

    const [isCreatingMode, setIsCreatringMode] = useState(false)


    function handleView(product: ProductType) {

        setSelectedProduct(product)

    }


    function handleCloseModal() {

        setSelectedProduct(null)

    }


    if (isLoading) {
        return <div>Carregando produtos...</div>
    }


    return (

        <div className="products-page">

            <div className="products-header">

                <h1>
                    Produtos
                </h1>
                <button className="new-product-button" onClick={() => setIsCreatringMode(true)}>
                    Novo Produto
                </button>
            </div>


            <div className="products-grid">
                {isError ? (
                    <p className="products-error">
                        Erro ao buscar produtos
                    </p>
                ) : products?.length === 0 ? (
                    <p className="products-empty">
                        Nenhum produto cadastrado
                    </p>
                ) :
                    products?.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            onView={handleView}
                        />

                    ))
                }


            </div>


            {selectedProduct && (

                <ProductModal
                    product={selectedProduct}
                    close={handleCloseModal}
                />

            )}

            {
                isCreatingMode && (
                    <ProductModal
                        close={() => setIsCreatringMode(false)}
                    />
                )
            }

        </div>

    )
}