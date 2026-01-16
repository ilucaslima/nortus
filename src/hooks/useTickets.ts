import { NewTicketFormData } from "@/schemas";
import {
  createTicket,
  fetchTickets,
  Ticket,
  TicketDetail,
} from "@/services/tickets";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [details, setDetails] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  async function loadTickets() {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchTickets();
      setTickets(result.data);
      setDetails(result.details);
    } catch (err) {
      setError("Erro ao carregar tickets");
      console.error("Erro ao buscar tickets:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTicket(data: NewTicketFormData) {
    setIsCreating(true);

    try {
      const newTicket = await createTicket(data);

      setIsModalOpen(false);
      setTickets((prevTickets) => [newTicket, ...prevTickets]);

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
    loadTickets();
  }, []);

  return {
    tickets,
    details,
    loading,
    error,
    refetch: () => loadTickets(),

    isModalOpen,
    isCreating,
    openModal,
    closeModal,
    createTicket: handleCreateTicket,
  };
}

// Re-exportar tipos para compatibilidade
export type { Ticket, TicketDetail };
