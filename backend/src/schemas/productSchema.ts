import z from "zod"

export const createProductSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),

    description: z.string().optional(),

    price: z.number().positive("Preço deve ser maior que 0"),

    categoryId: z.number().int().positive("Categoria inválida")

})

export const updateProductSchema = z.object({
    name: z.string().min(2).optional(),

    description: z.string().optional(),

    price: z.number().positive("Preço deve ser maior que 0").optional(),

    categoryId: z.number().int().positive("Categoria inválida").optional()
})
