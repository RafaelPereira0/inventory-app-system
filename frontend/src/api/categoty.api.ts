import type { UpdateCategoryType } from "../types/category";
import { api } from "./axios";

export async function getCategoriesApi() {
    const response = await api.get("/category/all")

    return response.data.result
}

export async function updateCategoryApi(id: number, data: UpdateCategoryType) {
    const response = await api.put(`/category/${id}`, data)

    return response.data.result
}

export async function deleteCategoryApi(id: number) {
    const response = await api.delete(`/category/${id}`)

    return response.data.result
}

export async function createCategoryApi(data: UpdateCategoryType) {
    const response = await api.post("/category/create", data)

    return response.data.result
}