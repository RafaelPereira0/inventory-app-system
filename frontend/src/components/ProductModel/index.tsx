import { useState } from "react"
import { useForm } from "react-hook-form"

import "./styles.css"

import type {
    ProductModelProps,
    UpdateProductType
} from "../../types/products"

import { updateProducts } from "../../hooks/getProducts"


export default function ProductModal({
    product,
    close
}: ProductModelProps) {

    const [editing, setEditing] = useState(false)

    const updateProduct = updateProducts()

    const {
        register,
        handleSubmit
    } = useForm<UpdateProductType>({
        defaultValues: {
            name: product.name,
            description: product.description ?? "",
            price: product.price,
            quantity: product.quantity,
            categoryId: product.category.id
        }
    })


    function onSubmit(data: UpdateProductType) {

        updateProduct.mutate(
            {
                id: product.id,
                data
            },
            {
                onSuccess: () => {
                    close()
                }
            }
        )

    }


    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {editing
                            ? "Editar produto"
                            : product.name
                        }
                    </h2>

                    <button
                        className="close-button"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>


                {!editing ? (

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
                            >
                                Excluir
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


                        <label>
                            Descrição
                        </label>

                        <input
                            {...register("description")}
                        />


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


                        <label>
                            Estoque
                        </label>

                        <input
                            type="number"
                            {...register("quantity", {
                                valueAsNumber: true
                            })}
                        />


                        <label>
                            Categoria ID
                        </label>

                        <input
                            type="number"
                            {...register("categoryId", {
                                valueAsNumber: true
                            })}
                        />


                        <div className="form-actions">

                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                            >
                                Cancelar
                            </button>


                            <button
                                type="submit"
                                disabled={updateProduct.isPending}
                            >
                                {updateProduct.isPending
                                    ? "Salvando..."
                                    : "Salvar"
                                }
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    )
}