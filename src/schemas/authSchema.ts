import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Usuário é obrigatório")
    .refine((value) => {
      // Verifica se é email, CPF ou passaporte
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
      const passportRegex = /^[A-Z]{2}\d{6}$/;

      return (
        emailRegex.test(value) ||
        cpfRegex.test(value) ||
        passportRegex.test(value)
      );
    }, "Digite um e-mail, CPF ou passaporte válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Digite um e-mail válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  challengeLevel: z
    .number()
    .min(1, "Nível deve ser no mínimo 1")
    .max(10, "Nível deve ser no máximo 10")
    .default(1),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
