import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderType, UpdateOrderType } from "../types/order";
import { cancelOrderApi, getOrdersApi, updateOrderApi } from "../api/order.api";

export function getOrders() {

    const a = useQuery<OrderType[]>({
        queryKey: ['orders'],
        queryFn: getOrdersApi
    })

    return a
}

export function updateOrder() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: number,
            data: UpdateOrderType
        }) => updateOrderApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            })
        }
    })
}

export function cancelOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id
        }: {
            id: number
        }) => cancelOrderApi(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            })
        }
    })
}