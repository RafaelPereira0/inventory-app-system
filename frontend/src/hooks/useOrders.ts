import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateOrderType, OrderType, UpdateOrderType } from "../types/order";
import { cancelOrderApi, createOrderApi, getOrdersApi, updateOrderApi } from "../api/order.api";

export function getOrders() {

    const data = useQuery<OrderType[]>({
        queryKey: ['orders'],
        queryFn: getOrdersApi
    })

    return data
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

export function createOrder(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateOrderType) =>
            createOrderApi(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })

            queryClient.invalidateQueries({
                queryKey: ["products"]
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