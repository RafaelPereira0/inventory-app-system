import { useState } from "react"

import ProductModal from "../../components/ProductModal"


import "./styles.css"
import { getCategories } from "../../hooks/useCategory"
import CategoryCard from "../../components/CategoryCard"
import type { CategoryType } from "../../types/category"
import CategoryModal from "../../components/CategoryModal"


export default function Categories() {

    const {
        data: categories,
        isLoading,
        isError
    } = getCategories()


    const [selectedCategory, setSelectedCategory] =
        useState<CategoryType | null>(null)

    const [isCreatingMode, setIsCreatringMode] = useState(false)


    function handleView(category: CategoryType) {

        setSelectedCategory(category)

    }


    function handleCloseModal() {

        setSelectedCategory(null)

    }


    if (isLoading) {
        return <div>Carregando categorias...</div>
    }


    if (isError) {
        return <div>Erro ao carregar categorias.</div>
    }


    return (

        <div className="products-page">

            <div className="products-header">

                <h1>
                    Categorias
                </h1>
                <button className="new-product-button" onClick={() => setIsCreatringMode(true)}>
                    Nova Categoria
                </button>
            </div>


            <div className="products-grid">

                {categories?.map((category) => (

                    <CategoryCard
                        key={category.id}
                        category={category}
                        onView={handleView}
                    />

                ))}

            </div>


            {selectedCategory && (

                <CategoryModal
                    category={selectedCategory}
                    close={handleCloseModal}
                />

            )}

            {
                isCreatingMode && (
                    <CategoryModal
                        close={() => setIsCreatringMode(false)}
                    />
                )
            }

        </div>

    )
}