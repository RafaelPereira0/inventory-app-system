
import { useEffect, useState } from "react";
import {
    UserRound,
    Mail,
    Pencil,
    Save,
    X,
    MapPin,
    MapPinned,
} from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import "./styles.css";
import type { AddressForm, ProfileForm } from "../../../types/profile";
import { updaetUser } from "../../../hooks/useUsers";
import { useToast } from "../../../hooks/useToast";
import { createAddress, findAddress, useUserAddress } from "../../../hooks/useAddress";



const emptyAddress: AddressForm = {
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
};

export default function Profile() {
    const { user } = useAuth();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const createAddressMutation = createAddress()

    const [profileForm, setProfileForm] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const [addressForm, setAddressForm] =
        useState<AddressForm>({ ...emptyAddress });

    const updateUser = updaetUser()
    const { showToast } = useToast()

    const userAddressQuery = useUserAddress();

    const addressQuery = findAddress(addressForm.cep);

    const savedAddress =
        userAddressQuery.data?.find((item: any) => item.isDefault) ??
        userAddressQuery.data?.[0];

    useEffect(() => {
        setProfileForm({
            name: user?.name ?? "",
            email: user?.email ?? "",
        });
    }, [user]);

    useEffect(() => {
        if (!savedAddress || isEditingAddress) return;

        setAddressForm({
            cep: savedAddress.cep,
            street: savedAddress.street,
            number: savedAddress.number,
            complement: savedAddress.complement ?? "",
            neighborhood: savedAddress.neighborhood,
            city: savedAddress.city,
            state: savedAddress.state,
        });
    }, [savedAddress, isEditingAddress]);

    useEffect(() => {
        const address = addressQuery.data;

        if (!address || !isEditingAddress) return;

        setAddressForm((prev) => ({
            ...prev,
            cep: address.cep ?? prev.cep,
            street: address.street ?? "",
            neighborhood: address.neighborhood ?? "",
            city: address.city ?? "",
            state: address.state ?? "",
        }));

        showToast("Endereço encontrado!", "success");
    }, [addressQuery.data, isEditingAddress]);

    useEffect(() => {
        if (addressQuery.isError && isEditingAddress) {
            showToast(
                "Não foi possível consultar o CEP.",
                "error"
            );
        }
    }, [addressQuery.isError, isEditingAddress]);

    const isLookingForCep = addressQuery.isFetching;

    function handleProfileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    function handleAddressChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;

        setAddressForm((prev) => ({
            ...prev,
            [name]: name === "state" ? value.toUpperCase() : value,
        }));

    }


    function handleCancelProfile() {
        setProfileForm({
            name: user?.name ?? "",
            email: user?.email ?? "",
        });

        setIsEditingProfile(false);
    }

    function handleSaveProfile(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        updateUser.mutate(
            {
                id: user!.id,
                data: profileForm
            },
            {
                onSuccess: () => {

                    showToast(
                        "Usuário atualizado com sucesso!",
                        "success"
                    )

                    setIsEditingProfile(false)
                },

                onError: () => {

                    showToast(
                        "Erro ao atualizar usuário",
                        "error"
                    )
                }
            }
        )

        setIsEditingProfile(false);
    }

    function handleSaveAddress(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        createAddressMutation.mutate(addressForm, {
            onSuccess: () => {
                showToast("Endereço salvo com sucesso", "success")
                setIsEditingAddress(false);
            },
            onError: () => {
                showToast("Erro ao salvar endereço", "error")
            }
        })

    }

    return (
        <main className="profile-page">
            <section className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <UserRound size={34} />
                    </div>

                    <div className="profile-heading">
                        <h1>Meu perfil</h1>
                        <p>
                            Gerencie seus dados pessoais e endereço
                            de entrega.
                        </p>
                    </div>
                </div>

                <div className="profile-divider" />

                <form onSubmit={handleSaveProfile}>
                    <section className="profile-section">
                        <div className="profile-section-title">
                            <h2>
                                <UserRound size={19} />
                                Dados pessoais
                            </h2>
                            <p>
                                Suas informações de cadastro.
                            </p>
                        </div>

                        <div className="profile-fields">
                            <div className="profile-field">
                                <label htmlFor="profile-name">
                                    Nome completo
                                </label>

                                <div className="profile-input-wrapper">
                                    <UserRound size={18} />

                                    <input
                                        id="profile-name"
                                        name="name"
                                        type="text"
                                        value={profileForm.name}
                                        onChange={handleProfileChange}
                                        disabled={!isEditingProfile}
                                        required
                                        minLength={2}
                                        autoComplete="name"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="profile-email">
                                    E-mail
                                </label>

                                <div className="profile-input-wrapper">
                                    <Mail size={18} />

                                    <input
                                        id="profile-email"
                                        name="email"
                                        type="email"
                                        value={profileForm.email}
                                        onChange={handleProfileChange}
                                        disabled={!isEditingProfile}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="profile-actions">
                        {!isEditingProfile ? (
                            <button
                                type="button"
                                className="profile-edit-button"
                                onClick={() =>
                                    setIsEditingProfile(true)
                                }
                            >
                                <Pencil size={17} />
                                Editar perfil
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={handleCancelProfile}
                                >
                                    <X size={17} />
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                >
                                    <Save size={17} />
                                    Salvar perfil
                                </button>
                            </>
                        )}
                    </div>
                </form>

                <div className="profile-divider" />

                <form onSubmit={handleSaveAddress}>
                    <section className="profile-section">
                        <div className="profile-section-title">
                            <h2>
                                <MapPin size={19} />
                                Endereço de entrega
                            </h2>
                            <p>
                                Endereço utilizado nas suas compras.
                            </p>
                        </div>

                        <div className="profile-fields">
                            <div className="profile-field">
                                <label htmlFor="address-cep">
                                    CEP
                                </label>

                                <div className="profile-input-wrapper">
                                    <MapPinned size={18} />

                                    <input
                                        required
                                        id="address-cep"
                                        name="cep"
                                        value={addressForm.cep}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="00000-000"
                                        autoComplete="postal-code"
                                        maxLength={9}
                                    />
                                </div>
                                {isLookingForCep && (
                                    <small className="cep-feedback">
                                        Consultando CEP...
                                    </small>
                                )}
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-street">
                                    Rua / Avenida
                                </label>

                                <div className="profile-input-wrapper">
                                    <MapPin size={18} />

                                    <input
                                        required
                                        id="address-street"
                                        name="street"
                                        value={addressForm.street}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="Nome da rua"
                                        autoComplete="address-line1"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-number">
                                    Número
                                </label>

                                <div className="profile-input-wrapper">
                                    <input
                                        required
                                        id="address-number"
                                        name="number"
                                        value={addressForm.number}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="Número"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-complement">
                                    Complemento
                                </label>

                                <div className="profile-input-wrapper">
                                    <input
                                        id="address-complement"
                                        name="complement"
                                        value={addressForm.complement}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="Apartamento, bloco..."
                                        autoComplete="address-line2"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-neighborhood">
                                    Bairro
                                </label>

                                <div className="profile-input-wrapper">
                                    <input
                                        required
                                        id="address-neighborhood"
                                        name="neighborhood"
                                        value={addressForm.neighborhood}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="Seu bairro"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-city">
                                    Cidade
                                </label>

                                <div className="profile-input-wrapper">
                                    <input
                                        required
                                        id="address-city"
                                        name="city"
                                        value={addressForm.city}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="Sua cidade"
                                        autoComplete="address-level2"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="address-state">
                                    Estado (UF)
                                </label>

                                <div className="profile-input-wrapper">
                                    <input
                                        required
                                        id="address-state"
                                        name="state"
                                        value={addressForm.state}
                                        onChange={handleAddressChange}
                                        disabled={!isEditingAddress || isLookingForCep}
                                        placeholder="SP"
                                        maxLength={2}
                                        autoComplete="address-level1"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="profile-actions">
                        {!isEditingAddress ? (
                            <button
                                type="button"
                                className="profile-edit-button"
                                onClick={() =>
                                    setIsEditingAddress(true)
                                }
                            >
                                <Pencil size={17} />
                                Editar endereço
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={() => setIsEditingAddress(false)}
                                >
                                    <X size={17} />
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={() => setAddressForm(emptyAddress)}
                                >
                                    <X size={17} />
                                    Limpar endereço
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                >
                                    <Save size={17} />
                                    Salvar endereço
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}
