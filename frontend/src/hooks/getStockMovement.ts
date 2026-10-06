import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateStockMovementType, StockMovementType } from "../types/stockMovement";
import { createStockMovementApi, getAllStockMovementApi } from "../api/stockMovement.api";
import type { UpdateOrderType } from "../types/order";
import { updateOrderApi } from "../api/order.api";

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

export function updateStockMovemente(){
    const queryClient = useQueryClient()

    return useMutation({
            mutationFn: ({
                id,
                data
            }: {
                id: number,
                data: UpdateOrderType
            })=> updateOrderApi(id, data),
    
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["orders"]
                })
            }
        })
}

