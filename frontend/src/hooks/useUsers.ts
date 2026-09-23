import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateUserType, UpdateUserType, UserType } from "../types/user";
import { createManagerApi, deleteUserApi, getAllUsersApi, updateUserApi } from "../api/user.api";

export function getAllUsers(){
    return useQuery<UserType[]>({
        queryKey: ['users'],
        queryFn: getAllUsersApi
    })
}

export function createManager(){
    const queryCliente = useQueryClient()

    return useMutation({
            mutationFn: ({
                data
            }: {
                data: CreateUserType
            }) => createManagerApi(data),
    
            onSuccess: ()=> {
                queryCliente.invalidateQueries({
                    queryKey: ["users"]
                })
            }
        })
}

export function deleteUser(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id
        }: {
            id: number
        })=> deleteUserApi(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    })
}

export function updaetUser(){

    const queryCliente = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: number,
            data: UpdateUserType
        })=> updateUserApi(data, id),

        onSuccess: () => {
            queryCliente.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
}