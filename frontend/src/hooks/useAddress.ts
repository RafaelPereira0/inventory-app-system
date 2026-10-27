import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AddressType, CreateAddressType, SavedAddressType } from "../types/address";
import { getAddress, getUserAddress, saveAddressApi } from "../api/address.api";

export function findAddress(cep: string){
    const cleanCep = cep.replace(/\D/g, "");

    const data = useQuery<AddressType>({
        queryKey: ["address", cleanCep],
        queryFn: () => getAddress(cleanCep),
        enabled: cep.replace(/\D/g, "").length === 8,
        retry: false,
    })

    return data
}

export function createAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAddressType) => saveAddressApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-address"],
      });
    },
  });
}

export function useUserAddress() {
    return useQuery<SavedAddressType[]>({
        queryKey: ["user-address"],
        queryFn: getUserAddress,
    });
}