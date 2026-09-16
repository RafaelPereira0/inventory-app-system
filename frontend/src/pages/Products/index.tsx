import { useState } from "react"

import ProductCard from "../../components/ProductCard"
import ProductModal from "../../components/ProductModel"

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


    function handleView(product: ProductType) {

        setSelectedProduct(product)

    }


    function handleCloseModal() {

        setSelectedProduct(null)

    }


    if (isLoading) {
        return <div>Carregando produtos...</div>
    }


    if (isError) {
        return <div>Erro ao carregar produtos.</div>
    }


    return (

        <div className="products-page">

            <div className="products-header">

                <h1>
                    Produtos
                </h1>

            </div>


            <div className="products-grid">

                {products?.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                        onView={handleView}
                    />

                ))}

            </div>


            {selectedProduct && (

                <ProductModal
                    product={selectedProduct}
                    close={handleCloseModal}
                />

            )}

        </div>

    )
}