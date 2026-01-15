import { z } from "zod";

export const newTicketSchema = z.object({
  clientName: z.string().min(1, "Nome do cliente é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  priority: z.enum(["Baixa", "Média", "Alta", "Urgente"], {
    required_error: "Selecione uma prioridade",
  }),
  responsible: z.string().min(1, "Responsável é obrigatório"),
  subject: z.string().min(1, "Assunto é obrigatório"),
});

export type NewTicketFormData = z.infer<typeof newTicketSchema>;
