import type { UpdateProductType } from "../types/products";
import { api } from "./axios";

export async function getProductsApi() {
    const response = await api.get('/product/all')

    return response.data.result
}

export async function updateProductApi(id: number, data: UpdateProductType) {
    const response = await api.put(`/product/${id}`, data)

    return response.data
}