"use client";

import {
  DashboardCard,
  ErrorMessage,
  LoadingSpinner,
  TicketsTable,
} from "@/components";

import {
  AverageTimeIcon,
  InProgressIcon,
  OpenTicketsIcon,
  ResolvedTodayIcon,
  SearchIcon,
} from "@/components/ui/Icons";

import { useTicketFilters } from "@/hooks/useTicketFilters";
import { useTickets } from "@/hooks/useTickets";

export default function GestaoTickets() {
  const { tickets, details, loading, error, refetch } = useTickets();
  const { filters, filteredTickets, updateFilter } = useTicketFilters(tickets);

  return (
    <div className="max-w-11/12 mx-auto gap-6 flex flex-col">
      <div className="grid grid-cols-4 gap-6">
        <DashboardCard
          title="Tickets Abertos"
          value={details?.opensCount.toString() || "0"}
          icon={<OpenTicketsIcon />}
        />
        <DashboardCard
          title="Em andamento"
          value={details?.inProgressCount.toString() || "0"}
          icon={<InProgressIcon />}
        />
        <DashboardCard
          title="Resolvidos hoje"
          value={details?.resolvedTodayCount.toString() || "0"}
          icon={<ResolvedTodayIcon />}
        />
        <DashboardCard
          title="Tempo Médio"
          value="16h"
          icon={<AverageTimeIcon />}
        />
      </div>

      <div className="bg-card-bg rounded-2xl border-border/30 border p-6">
        <p className="font-montserrat font-bold">Lista de Tickets</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-dashboard flex-1 flex items-center gap-3 px-4 py-3 rounded-full">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar por ID, cliente ou assunto..."
              className="bg-transparent border-none outline-none placeholder-gray-400 w-full"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select
              className="bg-transparent border-none outline-none text-gray-400 cursor-pointer"
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="aberto">Aberto</option>
              <option value="andamento">Em andamento</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select
              className="bg-transparent border-none outline-none text-gray-400 cursor-pointer"
              value={filters.priority}
              onChange={(e) => updateFilter("priority", e.target.value)}
            >
              <option value="">Todas as prioridades</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select
              className="bg-transparent border-none outline-none text-gray-400 cursor-pointer"
              value={filters.responsible}
              onChange={(e) => updateFilter("responsible", e.target.value)}
            >
              <option value="">Todos os responsáveis</option>
              <option value="joao">João Silva</option>
              <option value="maria">Maria Santos</option>
              <option value="pedro">Pedro Costa</option>
              <option value="ana">Ana Oliveira</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <TicketsTable tickets={filteredTickets} />
        )}
      </div>
    </div>
  );
}
