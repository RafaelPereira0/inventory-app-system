import { useForm } from "react-hook-form";
import type {  CreateStockMovementType, StockFormType, StockMovementModal } from "../../types/stockMovement";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockSchema } from "../../schemas/stockMovement.schema";
import { createStockMovement } from "../../hooks/getStockMovement";
import { useToast } from "../../hooks/useToast"
import { getProducts } from "../../hooks/getProducts";
import './styles.css'

export default function StockMovementModal ({type, close}: StockMovementModal){
    
    const createStock = createStockMovement()
    const {data: products, isLoading} = getProducts()
    const {showToast} = useToast()

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<StockFormType>({
            defaultValues: {
                quantity: 0,
                productId: 0
            },
            resolver: zodResolver(stockSchema)
    })

    const selectedProductId = watch('productId')

    const selectedProduct = products?.find((product) => 
        product.id === selectedProductId
    )

    function onSubmit(data: StockFormType){

        if(type === "OUT" && selectedProduct && data.quantity > selectedProduct.quantity){
               showToast("Quantidade maior do que estoque disponível", "warning")

               return
        }

        createStock.mutate({
            productId: data.productId,
            quantity: data.quantity,
            type
        }, {
            onSuccess: () => {
                close()

                showToast(
                    type === "IN" ? "Entrada registrada com sucesso" : "Saída registrada com sucesso", "success"
                )
            },

            onError: (error) => {
                showToast(
                    type === "IN" ? `Erro ao registrar entrada` : `Erro ao registrar saída`, "error"
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
                        {type === "IN" ? "Registrar Entrada" : "Registrar Saída"}
                    </h2>

                    <button onClick={close} className="close-button">
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
                    <label>
                        Produto
                    </label>

                    <select
                    {...register("productId", {
                            valueAsNumber: true
                        })}
                        disabled={isLoading}    
                    >
                        {products?.map((product) => (
                            <option value={product.id} key={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    {errors.productId && (
                        <p>
                            {errors.productId.message}
                        </p>
                    )}

                    {selectedProduct && (
                        <p>
                            Estoque atual: {" "}
                            <strong>
                                {selectedProduct.quantity}
                            </strong>
                        </p>
                    )}

                    <label>
                        Quantidade
                    </label>

                    <input type="number" {
                        ...register("quantity", {
                            valueAsNumber: true
                        })
                    } disabled={isLoading}/>

                    {errors.quantity && (
                        <p>
                            {errors.quantity.message}
                        </p>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={close}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={createStock.isPending}
                        >
                            {createStock.isPending ? "Salvando..." : "Confirmar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}