import { api } from "./axios";

export async function getProductsApi() {
    const response = await api.get('/product/all')

    return response.data.result
}