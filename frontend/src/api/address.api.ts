import type { AddressType, CreateAddressType, SavedAddressType } from "../types/address";
import { api } from "./axios";

export async function getAddress(cep: string) {
    const response = await api.post("/address/lookup", {
        cep
    })

    return response.data
}

export async function saveAddressApi(address: CreateAddressType) {
    const response = await api.post("/address/save", address)

    return response.data
}

export async function getUserAddress(): Promise<SavedAddressType[]> {
    const response = await api.get<SavedAddressType[]>("/address/me");

    return response.data;
}