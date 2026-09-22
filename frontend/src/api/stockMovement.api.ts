import type { CreateStockMovementType } from "../types/stockMovement";
import { api } from "./axios";

export async function createStockMovementApi(data: CreateStockMovementType) {
    const response = await api.post("/movement/create", data)

    return response.data
}

export async function getAllStockMovementApi() {
    const response = await api.get("/movement/all")

    return response.data.result
}