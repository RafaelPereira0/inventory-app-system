import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import "./styles.css"

import type {
    UserModelProps,
    UserFormType
} from "../../types/user"

import {
    createManager,
    updaetUser,
    deleteUser
} from "../../hooks/useUsers"

import { useToast } from "../../hooks/useToast"

import { userSchema } from "../../schemas/user.schema"


export default function UserModal({
    user,
    close
}: UserModelProps) {

    const isEditing = !!user

    const [editing, setEditing] =
        useState(!isEditing)

    const createUser = createManager()
    const updateUser = updaetUser()
    const deleteUserMutation = deleteUser()

    const { showToast } = useToast()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserFormType>({
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            password: "",
            role: user?.role ?? "MANAGER"
        },

        resolver: zodResolver(userSchema)
    })


    function onSubmit(data: UserFormType) {

        if (!user) {

            createUser.mutate(
                {
                    data
                },
                {
                    onSuccess: () => {

                        showToast(
                            "Usuário criado com sucesso!",
                            "success"
                        )

                        close()
                    },

                    onError: () => {

                        showToast(
                            "Erro ao criar usuário",
                            "error"
                        )
                    }
                }
            )

            return
        }


        updateUser.mutate(
            {
                id: user.id,
                data
            },
            {
                onSuccess: () => {

                    showToast(
                        "Usuário atualizado com sucesso!",
                        "success"
                    )

                    close()
                },

                onError: () => {

                    showToast(
                        "Erro ao atualizar usuário",
                        "error"
                    )
                }
            }
        )
    }


    function handleDelete() {

        if (!user) {
            return
        }

        deleteUserMutation.mutate(
            {
                id: user.id
            },
            {
                onSuccess: () => {

                    showToast(
                        "Usuário excluído com sucesso!",
                        "success"
                    )

                    close()
                },

                onError: () => {

                    showToast(
                        "Erro ao excluir usuário",
                        "error"
                    )
                }
            }
        )
    }


    return (
        <div className="user-modal-overlay">

            <div className="user-modal">

                <div className="user-modal-header">

                    <h2>
                        {user
                            ? editing
                                ? "Editar usuário"
                                : user.name
                            : "Novo usuário"
                        }
                    </h2>

                    <button
                        className="user-modal-close-button"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>


                {user && !editing ? (

                    <>

                        <div className="user-modal-content">

                            <p>
                                <strong>Nome:</strong>{" "}
                                {user.name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {user.email}
                            </p>

                            <p>
                                <strong>Perfil:</strong>{" "}
                                {user.role}
                            </p>

                        </div>


                        <div className="user-modal-actions">

                            <button
                                className="user-edit-button"
                                onClick={() => setEditing(true)}
                            >
                                Editar
                            </button>

                            <button
                                className="user-delete-button"
                                disabled={
                                    deleteUserMutation.isPending
                                }
                                onClick={handleDelete}
                            >
                                {deleteUserMutation.isPending
                                    ? "Excluindo..."
                                    : "Excluir"
                                }
                            </button>

                        </div>

                    </>

                ) : (

                    <form
                        className="user-modal-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <label>
                            Nome
                        </label>

                        <input
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="user-modal-error">
                                {errors.name.message}
                            </p>
                        )}


                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="user-modal-error">
                                {errors.email.message}
                            </p>
                        )}


                        <label>
                            Perfil
                        </label>

                        <select
                            {...register("role")}
                        >
                            <option value="MANAGER">
                                Manager
                            </option>

                            <option value="ADMIN">
                                Admin
                            </option>
                        </select>

                        {errors.role && (
                            <p className="user-modal-error">
                                {errors.role.message}
                            </p>
                        )}

                        <label>
                            Senha
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="user-modal-error">
                                {errors.password.message}
                            </p>
                        )}


                        <div className="user-modal-form-actions">

                            {user && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancelar
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    createUser.isPending ||
                                    updateUser.isPending
                                }
                            >
                                {createUser.isPending ||
                                updateUser.isPending
                                    ? "Salvando..."
                                    : user
                                        ? "Salvar"
                                        : "Criar usuário"
                                }
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    )
}