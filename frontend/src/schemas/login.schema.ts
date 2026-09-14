import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Senha precisa ter 6 caracteres no mínimo")
})

export type LoginFormData = z.infer<typeof loginSchema>