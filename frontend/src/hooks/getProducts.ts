import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/products.api";
import type {ProductType} from "../types/products";

export function getProducts(){
    return useQuery<ProductType[]>({
        queryKey: ["products"],
        queryFn: getProductsApi
    })
}