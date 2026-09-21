import z from "zod";

export const categorySchema = z.object({
    name: z.string().min(3, "A categoria deve ter no mínimo 3 caracteres")
})

export type ProductFormData = z.infer<typeof categorySchema>