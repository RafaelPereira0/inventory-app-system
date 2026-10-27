export type ProfileForm = {
    name: string;
    email: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
};


export type AddressForm = Pick<
    ProfileForm,
    | "cep"
    | "street"
    | "number"
    | "complement"
    | "neighborhood"
    | "city"
    | "state"
>;
