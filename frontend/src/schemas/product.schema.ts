import {z} from 'zod'

export const productSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório"),

    description: z
        .string()
        .optional(),

    price: z
        .number({
            error: "Preço é obrigatório"
        })
        .positive("O preço deve ser maior que 0"),

    quantity: z
        .number({
            error: "Quantidade é obrigatória"
        })
        .min(0, "A quantidade não pode ser negativa"),

    categoryId: z
        .number({
            error: "Categoria é obrigatória"
        })
        .positive("Selecione uma categoria")
})

export type ProductFormData = z.infer<typeof productSchema>