export const mockTickets = [
  {
    id: "TK001",
    priority: "urgente" as const,
    client: {
      name: "Ricardo Leite",
      email: "ricardo@email.com",
    },
    subject: "Solicitação de alteração",
    status: "aberto" as const,
    createdAt: "14/12/2024",
    responsible: "Ana Silva",
  },
  {
    id: "TK002",
    priority: "media" as const,
    client: {
      name: "Maria Silva",
      email: "mariasilva@email.com",
    },
    subject: "Dúvida sobre cobertura",
    status: "aberto" as const,
    createdAt: "13/12/2024",
    responsible: "João Costa",
  },
  {
    id: "TK003",
    priority: "baixa" as const,
    client: {
      name: "João Costa",
      email: "costajoao@email.com",
    },
    subject: "Sinistro na residência",
    status: "andamento" as const,
    createdAt: "13/12/2024",
    responsible: "Carlos Lima",
  },
  {
    id: "TK004",
    priority: "urgente" as const,
    client: {
      name: "Residencial Premium",
      email: "rpremium@email.com",
    },
    subject: "Seguro residencial",
    status: "aberto" as const,
    createdAt: "12/12/2024",
    responsible: "Anderson Freitas",
  },
  {
    id: "TK006",
    priority: "media" as const,
    client: {
      name: "Família Total",
      email: "familiatotal@email.com",
    },
    subject: "Dúvida sobre combo automóvel e residencial",
    status: "aberto" as const,
    createdAt: "09/12/2024",
    responsible: "Ana Silva",
  },
];
