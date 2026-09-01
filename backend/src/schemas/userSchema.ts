import z from 'zod'

export const userSchema = z.object({
    name: z.string().min(4),
    email: z.email(),
    password: z.string().min(6)
})

export const userUpdateSchema = z.object({
    name: z.string().min(4).optional(),
    email: z.email().optional(),
    password: z.string().min(4).optional()
})