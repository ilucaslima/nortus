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

interface TicketDetail {
  opensCount: number;
  inProgressCount: number;
  averageResolutionTime: string;
  resolvedTodayCount: number;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [details, setDetails] = useState<TicketDetail | null>(null);
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

      const detailsTickets = {
        opensCount: response.data.data.filter(
          (ticket: Ticket) => ticket.status === "Aberto"
        ).length,
        inProgressCount: response.data.data.filter(
          (ticket: Ticket) => ticket.status === "Em andamento"
        ).length,
        averageResolutionTime: "2.5h",
        resolvedTodayCount: response.data.data.filter(
          (ticket: Ticket) =>
            ticket.status === "Fechado" &&
            ticket.updatedAt === new Date().toISOString()
        ).length,
      };
      setDetails(detailsTickets);
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

  return { tickets, details, loading, error, refetch: () => fetchTickets() };
}
