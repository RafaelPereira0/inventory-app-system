import { useState } from "react"
import { useForm } from "react-hook-form"
import type {
    CreateOrderModalProps,
    CreateOrderType
} from "../../types/order"
import { useToast } from "../../hooks/useToast"
import "./styles.css"
import { createOrder } from "../../hooks/useOrders"


export default function CreateOrderModal({
    close,
    products,
    users
}: CreateOrderModalProps) {

    const { showToast } = useToast()

    const [selectedProduct, setSelectedProduct] = useState("")
    const [quantity, setQuantity] = useState(1)

    const [items, setItems] = useState<CreateOrderType["items"]>([])
    const createOrderMutate = createOrder()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateOrderType>()

    function addProduct() {
        if (!selectedProduct) {
            showToast("Selecione um produto", "error")
            return
        }

        if (quantity <= 0) {
            showToast("A quantidade deve ser maior que zero", "error")
            return
        }

        const product = products.find(
            product => product.id === Number(selectedProduct)
        )

        if (!product) {
            showToast("Produto não encontrado", "error")
            return
        }

        if (quantity > product.quantity) {
            showToast(
                `Estoque disponível: ${product.quantity}`,
                "error"
            )
            return
        }

        const alreadyAdded = items.some(
            item => item.productId === product.id
        )

        if (alreadyAdded) {
            showToast("Esse produto já foi adicionado", "error")
            return
        }

        setItems(prev => [
            ...prev,
            {
                productId: product.id,
                quantity
            }
        ])

        setSelectedProduct("")
        setQuantity(1)
    }

    function removeProduct(productId: number) {
        setItems(prev =>
            prev.filter(item => item.productId !== productId)
        )
    }

    function onSubmit(data: CreateOrderType) {
        if (items.length === 0) {
            showToast("Adicione pelo menos um produto", "error")
            return
        }

        const order: CreateOrderType = {
            userId: Number(data.userId),
            items
        }

        createOrderMutate.mutate(
            order,
            {
                onSuccess: () => {
                    close()
                    showToast("Pedido criado com sucesso!", "success")
                },

                onError: () => {
                    showToast("Erro ao criar pedido", "error")
                }
            }
        )
        
    }

    return (
        <div className="modal-overlay">
            <div className="modal create-order-modal">

                <div className="modal-header">
                    <h2>Novo pedido</h2>

                    <button
                        className="close-button"
                        type="button"
                        onClick={close}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="modal-content">

                        {/* CLIENTE */}
                        <div className="form-group">
                            <label htmlFor="userId">
                                Cliente
                            </label>

                            <select
                                id="userId"
                                {...register("userId", {
                                    required: "Selecione um cliente"
                                })}
                            >
                                <option value="">
                                    Selecione um cliente
                                </option>

                                {users.map(user => (
                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            {errors.userId && (
                                <span className="error-message">
                                    Selecione um cliente
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="product">
                                Produto
                            </label>

                            <select
                                id="product"
                                value={selectedProduct}
                                onChange={event =>
                                    setSelectedProduct(event.target.value)
                                }
                            >
                                <option value="">
                                    Selecione um produto
                                </option>

                                {products
                                    .filter(product => product.quantity > 0)
                                    .map(product => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.name} — estoque:{" "}
                                            {product.quantity}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* QUANTIDADE */}
                        <div className="form-group">
                            <label htmlFor="quantity">
                                Quantidade
                            </label>

                            <div className="quantity-container">
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={event =>
                                        setQuantity(
                                            Number(event.target.value)
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    className="add-product-button"
                                    onClick={addProduct}
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>


                        <div className="selected-products">

                            <h3>Produtos do pedido</h3>

                            {items.length === 0 ? (
                                <p className="empty-products">
                                    Nenhum produto adicionado.
                                </p>
                            ) : (
                                items.map(item => {

                                    const product = products.find(
                                        product =>
                                            product.id === item.productId
                                    )

                                    if (!product) {
                                        return null
                                    }

                                    return (
                                        <div
                                            className="selected-product"
                                            key={item.productId}
                                        >
                                            <div>
                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <span>
                                                    Quantidade:{" "}
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                className="remove-product-button"
                                                onClick={() =>
                                                    removeProduct(
                                                        item.productId
                                                    )
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    )
                                })
                            )}

                        </div>

                    </div>


                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={close}
                        >
                            Fechar
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                        >
                            Criar pedido
                        </button>

                    </div>

                </form>

            </div>
        </div>
    )
}