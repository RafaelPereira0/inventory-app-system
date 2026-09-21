export interface CategoryType{
    id: number,
    name: string
}

export interface UpdateCategoryType{
    name: string
}

export interface CategoryTypeProps {
    category: CategoryType,
    onView: (category: CategoryType) => void
}

export interface CategoryModelProps{
    category? : CategoryType,
    close: () => void
}