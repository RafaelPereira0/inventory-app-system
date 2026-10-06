import z from "zod";


export const stockSchema = z.object({
    productId: z.number({ error: "selecione um produto" }).positive(),
    quantity: z.number({ error: "quantidade é obrigatória" }).positive().int(),
    reason: z.enum([
        "PURCHASE",
        "SALE",
        "LOSS"
    ], {
        error: "Selecione o motivo da movimentação"
    })
})
