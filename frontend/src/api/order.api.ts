import type { UpdateOrderType } from "../types/order";
import { api } from "./axios";

export async function getOrdersApi() {
    const response = await api.get('/order/all')
    console.log(response)
    return response.data.result
}

export async function updateOrderApi(id: number, data: UpdateOrderType) {
    const response = await api.post(`order/${id}`, data)
    
    return response.data.result
}

export async function cancelOrderApi(id: number) {
    const response = await api.post(`/order/cancel/${id}`)

    return response.data.result
}