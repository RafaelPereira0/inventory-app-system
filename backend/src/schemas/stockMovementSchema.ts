import z from "zod"

const createStockMovement = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    type: z.enum(["IN", "OUT"]),
    reason: z.enum(["PURCHASE", "SALE", "LOSS"])
})

export default createStockMovement