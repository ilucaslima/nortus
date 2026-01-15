import { useEffect, useState } from "react";

import { api } from "@/config/api";

import { NewTicketFormData } from "@/schemas";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  client: string;
  email: string;
  responsible: string;
  priority: "Baixa" | "Média" | "Alta" | "Urgente";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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

  async function createTicket(data: NewTicketFormData) {
    setIsCreating(true);

    try {
      const token = Cookies.get("auth-token") || "";

      const ticketId = `TK${Date.now()}`;

      const ticketData = {
        ...data,
        ticketId: `TK${ticketId.slice(-4)}`,
        client: data.clientName,
        status: "Aberto" as const,
      };

      await api.post("/tickets", ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsModalOpen(false);
      setTickets((prevTickets) => [
        {
          ...ticketData,
          id: String(prevTickets.length + 1),
          status: "Aberto",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prevTickets,
      ]);

      toast.info("Ticket criado com sucesso!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "toast-large",
        theme: "colored",
        style: {
          fontSize: "18px",
          padding: "20px",
          minHeight: "80px",
          width: "400px",
        },
      });
    } catch (err) {
      console.error("Erro ao criar ticket:", err);
      toast.error("Erro ao criar ticket. Tente novamente.");
    } finally {
      setIsCreating(false);
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    details,
    loading,
    error,
    refetch: () => fetchTickets(),

    isModalOpen,
    isCreating,
    openModal,
    closeModal,
    createTicket,
  };
}
