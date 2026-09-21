import type { CreateProductType, UpdateProductType } from "../types/products";
import { api } from "./axios";

export async function getProductsApi() {
    const response = await api.get('/product/all')

    return response.data.result
}

export async function updateProductApi(id: number, data: UpdateProductType) {
    const response = await api.put(`/product/${id}`, data)

    return response.data
}

export async function deleteProductApi(id: number) {
    const response = await api.post(`/product/${id}`)

    return response.data
}

export async function createProductApi(data: CreateProductType) {
    const response = await api.post("/product/create", data)

    return response.data
}