import { Ticket } from "@/services/tickets";
import { useMemo, useState } from "react";

interface Filters {
  search: string;
  status: string;
  priority: string;
  responsible: string;
}

export function useTicketFilters(tickets: Ticket[]) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "",
    priority: "",
    responsible: "",
  });

  const filteredTickets = useMemo(() => {
    if (!tickets || tickets.length === 0) {
      return [];
    }

    return tickets.filter((ticket) => {
      const searchLower = filters.search.toLowerCase();

      const matchesSearch =
        !filters.search ||
        [ticket.ticketId, ticket.client, ticket.subject].some((field) =>
          field?.toLowerCase().includes(searchLower)
        );

      const statusMap: Record<string, string> = {
        aberto: "Aberto",
        andamento: "Em andamento",
        fechado: "Fechado",
      };
      const matchesStatus =
        !filters.status || ticket.status === statusMap[filters.status];

      const priorityMap: Record<string, string> = {
        Baixa: "Baixa",
        Média: "Média",
        Alta: "Alta",
        Urgente: "Urgente",
      };
      const matchesPriority =
        !filters.priority || ticket.priority === priorityMap[filters.priority];

      const matchesResponsible =
        !filters.responsible ||
        ticket.responsible
          ?.toLowerCase()
          .includes(filters.responsible.toLowerCase());

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesResponsible
      );
    });
  }, [
    tickets,
    filters.search,
    filters.status,
    filters.priority,
    filters.responsible,
  ]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      responsible: "",
    });
  };

  return {
    filters,
    filteredTickets,
    updateFilter,
    clearFilters,
  };
}
