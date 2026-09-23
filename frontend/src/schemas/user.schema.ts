import { z } from "zod"

export const userSchema = z.object({

    name: z
        .string()
        .min(1, "Nome é obrigatório"),

    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido"),

    password: z
        .string()
        .refine(
            (value) => value === "" || value.length >= 6,
            "A senha deve ter pelo menos 6 caracteres"
        ),

    role: z.enum(
        ["ADMIN", "MANAGER", "CUSTOMER"],
        {
            error: "Selecione um perfil"
        }
    )

})