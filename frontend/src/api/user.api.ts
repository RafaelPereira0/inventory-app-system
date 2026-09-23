import type { CreateUserType, UpdateUserType } from "../types/user";
import { api } from "./axios";

export async function getAllUsersApi() {
    const response = await api.get("/user/all")

    return response.data.result
}

export async function createManagerApi(data: CreateUserType) {
    const response = await api.post('/user/create/manager', data)

    return response.data.result
}

export async function updateUserApi(data: UpdateUserType, id: number) {
    const response = await api.put(`/user/${id}`, data)

    return response.data.result
}

export async function deleteUserApi(id: number) {
    const response = await api.delete(`/user/${id}`)

    return response.data.result
}