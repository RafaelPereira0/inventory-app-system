import z from "zod";

const orderSchema = z.object({
    userId: z.number().int().positive(),
    items: z.array(z.object({ productId: z.number().int().positive(), quantity: z.number().int().positive() })).min(1, "O pedido deve possuir pelo menos um produto")
})

export default orderSchema