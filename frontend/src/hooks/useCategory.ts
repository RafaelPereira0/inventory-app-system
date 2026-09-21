import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryType, UpdateCategoryType } from "../types/category";
import { createCategoryApi, deleteCategoryApi, getCategoriesApi, updateCategoryApi } from "../api/categoty.api";

export function getCategories(){
    return useQuery<CategoryType[]>({
        queryKey: ['category'],
        queryFn: getCategoriesApi
    })
}

export function updateCategories(){

    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: number,
            data: UpdateCategoryType
        })=> updateCategoryApi(id, data),

        onSuccess: () => {
            queryCliente.invalidateQueries({
                queryKey: ["category"]
            })
        }
    })
}

export function deleteCategories(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id
        }: {
            id: number
        })=>deleteCategoryApi(id),

        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
}

export function createCategories() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            data
        }: {
            data: UpdateCategoryType
        }) => createCategoryApi(data),

        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["category"]
            })
        }
    })
}