import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateStockMovementType, StockMovementType } from "../types/stockMovement";
import { createStockMovementApi, getAllStockMovementApi } from "../api/stockMovement.api";

export function getStockMovement(){
    return useQuery<StockMovementType[]>({
        queryKey: ['stockMovements'],
        queryFn: getAllStockMovementApi
    })
}

export function createStockMovement() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateStockMovementType) =>
            createStockMovementApi(data),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["stockMovements"]
            })

            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        }
    })
}

