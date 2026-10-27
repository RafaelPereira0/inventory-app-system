export interface AddressType {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface SavedAddressType{
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string,
    complement: string | null,
    isDefault: boolean;
}

export interface CreateAddressType{
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string,
    complement: string | null
}