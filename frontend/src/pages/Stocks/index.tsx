import { useState } from "react"
import { getStockMovement } from "../../hooks/getStockMovement"
import StockMovementModal from "../../components/StockMovementModal"
import "./styles.css"

export default function Stock() {

    const {
        data: movements,
        isLoading,
        isError
    } = getStockMovement()

    const [
        movementType,
        setMovementType
    ] = useState<"IN" | "OUT" | null>(null)


    if (isLoading) {
        return <div>Carregando movimentações...</div>
    }


    return (
        <div className="stock-page">

            <div className="stock-header">

                <h1>Estoque</h1>

                <div className="stock-actions">

                    <button
                        className="stock-entry-button"
                        onClick={() => setMovementType("IN")}
                    >
                        + Entrada
                    </button>

                    <button
                        className="stock-exit-button"
                        onClick={() => setMovementType("OUT")}
                    >
                        - Saída
                    </button>

                </div>

            </div>


            <div className="stock-content">

                <h2>Movimentações</h2>

                {isError ? (

                    <p className="stock-empty">
                        Erro ao carregar movimentações.
                    </p>

                ) : movements?.length === 0 ? (

                    <p className="stock-empty">
                        Nenhuma movimentação registrada.
                    </p>

                ) : (

                    movements?.map((movement) => (

                        <div
                            className="stock-item"
                            key={movement.id}
                        >

                            <div>

                                <strong>
                                    {movement.product.name}
                                </strong>

                                <span>
                                    {new Date(
                                        movement.createdAt
                                    ).toLocaleString("pt-BR")}
                                </span>

                            </div>

                            <span
                                className={
                                    movement.type === "IN"
                                        ? "stock-in"
                                        : "stock-out"
                                }
                            >
                                {movement.type === "IN"
                                    ? `+${movement.quantity}`
                                    : `-${movement.quantity}`
                                }
                            </span>

                        </div>

                    ))

                )}

            </div>


            {movementType && (

                <StockMovementModal
                    type={movementType}
                    close={() => setMovementType(null)}
                />

            )}

        </div>
    )
}