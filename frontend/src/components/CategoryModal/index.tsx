import { useState } from "react"
import { useForm } from "react-hook-form"

import "./styles.css"

import type {
    CreateProductType,
} from "../../types/products"

import { useToast } from "../../hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../../schemas/product.schema"
import type { CategoryModelProps, CategoryType, UpdateCategoryType } from "../../types/category"
import { createCategories, deleteCategories, updateCategories } from "../../hooks/useCategory"
import axios from "axios"
import { categorySchema } from "../../schemas/category.schema"


export default function CategoryModal({
    category,
    close
}: CategoryModelProps) {

    const isEditing = !!category

    const [editing, setEditing] = useState(!isEditing)

    const updateCategory = updateCategories()
    const deleteCategory = deleteCategories()
    const createCategory = createCategories()

    const { showToast } = useToast()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdateCategoryType>({
        defaultValues: {
            name: category?.name ?? "",
        },
        resolver: zodResolver(categorySchema)
    })


    function onSubmit(data: UpdateCategoryType) {
        if (!category) {
            createCategory.mutate({
                data
            },{
                onSuccess: () => {
                    showToast(
                        "Categoria criada com sucesso",
                        "success"
                    )
                    close()
                },
                onError: () => {
                    showToast(
                        "Erro ao criar categoria",
                        "error"
                    )
                    close()
                }
            })

            return
        }
        updateCategory.mutate(
            {
                id: category.id,
                data
            },
            {
                onSuccess: () => {
                    close()

                    showToast(
                        "Categoria atualizada com sucesso",
                        "success"
                    )
                },

                onError: () => {
                    showToast(
                        "Erro ao atualizar categoria",
                        "error"
                    )
                }
            }
        )
    }


    function handleDelete() {

        if (!category) {
            return
        }

        deleteCategory.mutate({
            id: category.id
        }, {
            onSuccess: ()=>{
                showToast("Categoria excluída com sucesso", "success")
                close()
            },
            onError: (error) => {
                if(axios.isAxiosError(error)){
                    showToast(
                        error.response?.data?.message ||
                        "Erro ao excluir categoria",
                        "error"
                    )
                    close()
                    return
                }

                showToast(
                    "Erro ao excluir categoria",
                    "error"
                )
                close()
            }
        })
    }


    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {category
                            ? editing
                                ? "Editar categoria"
                                : category.name
                            : "Nova Categoria"
                        }
                    </h2>

                    <button
                        className="close-button"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>

                {category && !editing ? (

                    <>

                        <div className="modal-content">

                            <p>
                                <strong>Descrição:</strong>{" "}
                                {category.name || ""}
                            </p>

                        </div>


                        <div className="modal-actions">

                            <button
                                className="edit-button"
                                onClick={() => setEditing(true)}
                            >
                                Editar
                            </button>

                            <button
                                className="delete-button"
                                disabled={deleteCategory.isPending}
                                onClick={handleDelete}
                            >
                                {deleteCategory.isPending
                                    ? "Excluindo..."
                                    : "Excluir"
                                }
                            </button>

                        </div>

                    </>

                ) : (

                    <form
                        className="edit-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <label>
                            Nome
                        </label>

                        <input
                            {...register("name")}
                        />
                        {errors.name && <p className="error">
                            {errors.name.message}
                        </p>}

                        <div className="form-actions">

                            {category && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancelar
                                </button>
                            )}


                            <button
                                type="submit"
                                disabled={updateCategory.isPending || createCategory.isPending}
                            >
                                {updateCategory.isPending
                                    ? "Salvando..."
                                    : category
                                        ? "Salvar"
                                        : "Criar produto"
                                }
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    )
}
