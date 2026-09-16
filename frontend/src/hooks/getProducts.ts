import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsApi, updateProductApi } from "../api/products.api";
import type {ProductType, UpdateProductType} from "../types/products";

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