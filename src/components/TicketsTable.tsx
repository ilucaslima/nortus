import { ArrowRightIcon, EditIcon } from "@/components/ui/Icons";
import { usePagination } from "@/hooks/usePagination";
import { Ticket } from "@/hooks/useTickets";
import { formatDate } from "@/utils/format";
import { Pagination } from "./Pagination";

interface TicketsTableProps {
  tickets: Ticket[];
}

const priorityStyles = {
  Baixa: "bg-low text-dashboard",
  Média: "bg-medium text-dashboard",
  Urgente: "bg-urgent text-white",
};

const statusStyles = {
  Aberto: "bg-[#43D2CB] text-dashboard",
  "Em andamento": "bg-status-progress text-black",
  Fechado: "bg-gray-600 text-white",
};

const priorityLabels = {
  Baixa: "Baixa",
  Média: "Média",
  Urgente: "Urgente",
};

const statusLabels = {
  Aberto: "Aberto",
  "Em andamento": "Em andamento",
  Pendente: "Pendente",
  Resolvido: "Resolvido",
  Fechado: "Fechado",
};

export function TicketsTable({ tickets }: TicketsTableProps) {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    canGoPrev,
    canGoNext,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
  } = usePagination(tickets, 10);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full bg-table rounded-2xl">
          <thead>
            <tr className="border-b border-border/20">
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                ID
              </th>
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                Prioridade
              </th>
              <th className="text-left py-4 px-6 w-20 font-montserrat text-gray-400 font-normal">
                Cliente
              </th>
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                Assunto
              </th>
              <th className="text-left py-4 px-6 w-52 font-montserrat text-gray-400 font-normal">
                Status
              </th>
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                Criado em
              </th>
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                Responsável
              </th>
              <th className="text-left py-4 px-6 font-montserrat text-gray-400 font-normal">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((ticket) => (
              <tr key={ticket.id} className="border-b border-border/10 text-sm">
                <td className="py-4 px-6 font-montserrat font-medium">
                  {ticket.ticketId}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      priorityStyles[ticket.priority]
                    } px-3 py-1 rounded-full text-sm font-montserrat`}
                  >
                    {priorityLabels[ticket.priority]}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-montserrat font-medium">
                      {ticket.client}
                    </div>
                    <div className="text-gray-400 text-sm">{ticket.email}</div>
                  </div>
                </td>
                <td className="py-4 px-6 font-montserrat">{ticket.subject}</td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      statusStyles[ticket.status]
                    } px-3 py-1 rounded-full text-sm font-montserrat`}
                  >
                    {statusLabels[ticket.status]}
                  </span>
                </td>
                <td className="py-4 px-6 font-montserrat">
                  {formatDate(ticket.createdAt)}
                </td>
                <td className="py-4 px-6 font-montserrat">
                  {ticket.responsible}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-4">
                    <button className="text-white hover:text-blue-300 font-montserrat text-sm flex items-center gap-1">
                      Editar
                      <EditIcon width={16} className="text-primary" />
                    </button>
                    <button className="text-white hover:text-gray-300 font-montserrat text-sm flex items-center gap-1">
                      Ver
                      <ArrowRightIcon width={16} className="text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onFirstPage={goToFirstPage}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        onLastPage={goToLastPage}
      />
    </div>
  );
}
