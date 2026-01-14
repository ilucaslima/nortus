"use client";

import { ErrorMessage, LoadingSpinner, TicketsTable } from "@/components";
import { CalculatorIcon, SearchIcon } from "@/components/ui/Icons";
import { useTickets } from "@/hooks/useTickets";

export default function Dashboard() {
  const { tickets, loading, error, refetch } = useTickets();

  return (
    <div className="max-w-11/12 mx-auto gap-6 flex flex-col">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card-bg p-6 rounded-2xl border-border/30 border">
          <p className="font-montserrat">Tickets Abertos</p>
          <div className="flex items-center justify-between mt-8">
            <b className="text-xl">16</b>
            <CalculatorIcon />
          </div>
        </div>
        <div className="bg-card-bg p-6 rounded-2xl border-border/30 border">
          <p className="font-montserrat">Tickets Abertos</p>
          <div className="flex items-center justify-between mt-8">
            <b className="text-xl">16</b>
            <CalculatorIcon />
          </div>
        </div>
        <div className="bg-card-bg p-6 rounded-2xl border-border/30 border">
          <p className="font-montserrat">Tickets Abertos</p>
          <div className="flex items-center justify-between mt-8">
            <b className="text-xl">16</b>
            <CalculatorIcon />
          </div>
        </div>
        <div className="bg-card-bg p-6 rounded-2xl border-border/30 border">
          <p className="font-montserrat">Tickets Abertos</p>
          <div className="flex items-center justify-between mt-8">
            <b className="text-xl">16</b>
            <CalculatorIcon />
          </div>
        </div>
      </div>

      <div className="bg-card-bg rounded-2xl border-border/30 border p-6">
        <p className="font-montserrat font-bold">Lista de Tickets</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-dashboard flex-1 flex items-center gap-3 px-4 py-3 rounded-full">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar por ID, cliente ou assunto..."
              className="bg-transparent border-none outline-none placeholder-gray-400"
            />
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select className="bg-transparent border-none outline-none text-gray-400 cursor-pointer">
              <option value="">Todos os status</option>
              <option value="aberto">Aberto</option>
              <option value="andamento">Em Andamento</option>
              <option value="pendente">Pendente</option>
              <option value="resolvido">Resolvido</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select className="bg-transparent border-none outline-none text-gray-400 cursor-pointer">
              <option value="">Todas as prioridades</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div className="bg-dashboard flex items-center gap-3 px-4 py-3 rounded-full">
            <select className="bg-transparent border-none outline-none text-gray-400 cursor-pointer">
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
          <TicketsTable tickets={tickets} />
        )}
      </div>
    </div>
  );
}
