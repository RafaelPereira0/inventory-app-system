import { useState } from "react"
import { useForm } from "react-hook-form"

import "./styles.css"

import type {
    CreateProductType,
    ProductModelProps,
    UpdateProductType
} from "../../types/products"

import {
    createProduct,
    deleteProduct,
    updateProducts
} from "../../hooks/getProducts"

import { useToast } from "../../hooks/useToast"
import { getCategories } from "../../hooks/useCategory"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../../schemas/product.schema"


export default function ProductModal({
    product,
    close
}: ProductModelProps) {

    const isEditing = !!product

    const [editing, setEditing] = useState(!isEditing)

    const updateProduct = updateProducts()
    const deleteProductMutation = deleteProduct()
    const createProductMutation = createProduct()

    const { data: categories, isLoading: categoriesLoading } = getCategories()

    const { showToast } = useToast()


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateProductType>({
        defaultValues: {
            name: product?.name ?? "",
            description: product?.description ?? "",
            price: product?.price ?? 0,
            quantity: product?.quantity ?? 0,
            categoryId: product?.category.id ?? 0
        },
        resolver: zodResolver(productSchema)
    })


    function onSubmit(data: CreateProductType) {
        if (!product) {
            createProductMutation.mutate(
                data,
                {
                    onSuccess: () => {
                        close()
                        showToast(
                            "Producto criado com sucesso",
                            "success"
                        )
                    },
                    onError: () => {
                        showToast("Erro ao criar produto", "error")
                    }
                }
            )

            return
        }
        updateProduct.mutate(
            {
                id: product.id,
                data
            },
            {
                onSuccess: () => {
                    close()

                    showToast(
                        "Produto atualizado com sucesso",
                        "success"
                    )
                },

                onError: () => {
                    showToast(
                        "Erro ao atualizar produto",
                        "error"
                    )
                }
            }
        )
    }


    function handleDelete() {

        if (!product) {
            return
        }

        if (product.quantity > 0) {

            showToast(
                "Não é possível excluir um produto que possui estoque",
                "warning"
            )

            return
        }

        deleteProductMutation.mutate(
            { id: product.id },
            {
                onSuccess: () => {

                    showToast(
                        "Produto excluído com sucesso!",
                        "success"
                    )

                    close()
                },

                onError: () => {

                    showToast(
                        "Erro ao excluir produto.",
                        "error"
                    )
                }
            }
        )
    }


    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {product
                            ? editing
                                ? "Editar produto"
                                : product.name
                            : "Novo produto"
                        }
                    </h2>

                    <button
                        className="close-button"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>

                {product && !editing ? (

                    <>

                        <div className="modal-content">

                            <p>
                                <strong>Descrição:</strong>{" "}
                                {product.description || "Sem descrição"}
                            </p>

                            <p>
                                <strong>Categoria:</strong>{" "}
                                {product.category.name}
                            </p>

                            <p>
                                <strong>Preço:</strong>{" "}
                                R$ {product.price}
                            </p>

                            <p>
                                <strong>Estoque:</strong>{" "}
                                {product.quantity}
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
                                disabled={deleteProductMutation.isPending}
                                onClick={handleDelete}
                            >
                                {deleteProductMutation.isPending
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


                        <label>
                            Descrição
                        </label>

                        <input
                            {...register("description")}
                        />

                        {errors.description && <p className="error">
                            {errors.description.message}
                        </p>}
                        <label>
                            Preço
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            {...register("price", {
                                valueAsNumber: true
                            })}
                        />
                        {errors.price && <p className="error">
                            {errors.price.message}
                        </p>}

                        <label>
                            Estoque
                        </label>

                        <input
                            type="number"
                            {...register("quantity", {
                                valueAsNumber: true
                            })}
                        />
                        {errors.quantity && <p className="error">
                            {errors.quantity.message}
                        </p>}
                        <label>
                            Categoria
                        </label>

                        <select
                            {...register("categoryId", {
                                valueAsNumber: true
                            })}
                            disabled={categoriesLoading}
                        >
                            <option value={0}>
                                {categoriesLoading
                                    ? "Carregando categorias..."
                                    : "Selecione uma categoria"
                                }
                            </option>

                            {categories?.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="error">
                            {errors.categoryId.message}
                        </p>}

                        <div className="form-actions">

                            {product && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancelar
                                </button>
                            )}


                            <button
                                type="submit"
                                disabled={updateProduct.isPending || createProductMutation.isPending}
                            >
                                {updateProduct.isPending
                                    ? "Salvando..."
                                    : product
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
