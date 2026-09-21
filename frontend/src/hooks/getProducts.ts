import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProductApi, deleteProductApi, getProductsApi, updateProductApi } from "../api/products.api";
import type {CreateProductType, ProductType, UpdateProductType} from "../types/products";

export function getProducts(){
    return useQuery<ProductType[]>({
        queryKey: ["products"],
        queryFn: getProductsApi
    })
}

export function updateProducts(){

    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: number,
            data: UpdateProductType
        })=> updateProductApi(id, data),

        onSuccess: () => {
            queryCliente.invalidateQueries({
                queryKey: ["products"]
            })
        }
    })
}

export function deleteProduct() {

    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: ({
            id
        }: {
            id: number
        })=> deleteProductApi(id),

        onSuccess: () => {
            queryCliente.invalidateQueries({
                queryKey: ['products']
            })
        }
    })
}

export function createProduct() {
    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductType) =>
            createProductApi(data),

        onSuccess: () => {
            queryCliente.invalidateQueries({
                queryKey: ['products']
            })
        }
    })
}