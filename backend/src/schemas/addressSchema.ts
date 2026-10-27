import z from "zod";

export const cepSchema = z.string().transform((value) => 
    value.replace(/\D/g, "")
).pipe(
    z.string().regex(/^\d{8}$/, "CEP deve conter 8 dígitos")
)

export const addressSchema = z.object({
  label: z.string()
    .trim()
    .min(1, "Informe o nome do endereço")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .default("Casa"),

  cep: cepSchema,

  street: z.string()
    .trim()
    .min(3, "Informe o nome da rua")
    .max(150, "A rua deve ter no máximo 150 caracteres"),

  number: z.string()
    .trim()
    .min(1, "Informe o número do endereço")
    .max(20, "Número inválido"),

  complement: z.string()
    .trim()
    .max(100, "O complemento deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),

  neighborhood: z.string()
    .trim()
    .min(2, "Informe o bairro")
    .max(100, "O bairro deve ter no máximo 100 caracteres"),

  city: z.string()
    .trim()
    .min(2, "Informe a cidade")
    .max(100, "A cidade deve ter no máximo 100 caracteres"),

  state: z.string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Informe a UF com 2 letras"),

  isDefault: z.boolean().optional().default(true),
});

export type AddressInput = z.infer<typeof addressSchema>;