import "./styles.css"
import type { CategoryTypeProps } from "../../types/category"

export default function CategoryCard({
    category,
    onView
}: CategoryTypeProps) {
    return (
        <div className="category-card">

            <div className="category-info">
                <h2>{category.name}</h2>
                <div className="category-details">
                    <span>
                        Nome: {category.name}
                    </span>
                </div>
            </div>

            <div className="category-actions">
                <button onClick={() => onView(category)} className="view-button">
                    Ver Categoria
                </button>
            </div>

        </div>
    )
}
