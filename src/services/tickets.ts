import { api } from "@/config/api";
import { NewTicketFormData } from "@/schemas";
import Cookies from "js-cookie";

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

export interface TicketDetail {
  opensCount: number;
  inProgressCount: number;
  averageResolutionTime: string;
  resolvedTodayCount: number;
}

export async function fetchTickets(): Promise<{
  data: Ticket[];
  details: TicketDetail;
}> {
  try {
    const token = Cookies.get("auth-token") || "";
    const response = await api.get("/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tickets: Ticket[] = response.data.data;

    const details: TicketDetail = {
      opensCount: tickets.filter((ticket) => ticket.status === "Aberto").length,
      inProgressCount: tickets.filter(
        (ticket) => ticket.status === "Em andamento"
      ).length,
      averageResolutionTime: "2.5h",
      resolvedTodayCount: tickets.filter(
        (ticket) =>
          ticket.status === "Fechado" &&
          ticket.updatedAt === new Date().toISOString()
      ).length,
    };

    return { data: tickets, details };
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

export async function createTicket(data: NewTicketFormData): Promise<Ticket> {
  try {
    const token = Cookies.get("auth-token") || "";
    const ticketId = `TK${Date.now()}`;

    const ticketData = {
      ...data,
      ticketId: `TK${ticketId.slice(-4)}`,
      client: data.clientName,
      status: "Aberto" as const,
    };

    const response = await api.post("/tickets", ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      ...ticketData,
      id: response.data.id || String(Date.now()),
      status: "Aberto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}
