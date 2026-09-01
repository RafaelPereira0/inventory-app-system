import z from "zod";

export const orderCreateSchema = z.object({
    userId: z.number().int().positive(),
    items: z.array(z.object({ productId: z.number().int().positive(), quantity: z.number().int().positive() })).min(1, "O pedido deve possuir pelo menos um produto")
})

export const orderUpdateSchema = z.object({
    status: z.enum([
        "PAID",
        "DELIVERED",
        "CANCELLED"
    ])
})