import { useEffect, useState } from "react";

import { api } from "@/config/api";

import Cookies from "js-cookie";

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  client: string;
  email: string;
  responsible: string;
  priority: "Baixa" | "Média" | "Urgente";
  status: "Aberto" | "Em andamento" | "Fechado";
  createdAt: string;
  updatedAt: string;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTickets() {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("auth-token") || "";
      const response = await api.get("/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets(response.data.data);
    } catch (err) {
      setError("Erro ao carregar tickets");
      console.error("Erro ao buscar tickets:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, loading, error, refetch: () => fetchTickets() };
}
