"use client";

import { Modal, NewTicketForm } from "@/components";
import {
  CalculatorIcon,
  ChatIcon,
  GestaoIcon,
  KpisIcon,
  PlusIcon,
} from "@/components/ui/Icons";
import { useTickets } from "@/hooks/useTickets";
import { usePathname, useRouter } from "next/navigation";
import Dashboard from "./page";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    tickets,
    details,
    loading,
    error,
    refetch,
    isModalOpen,
    isCreating,
    openModal,
    closeModal,
    createTicket,
  } = useTickets();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <KpisIcon /> },
    {
      name: "Gestão de Tickets",
      href: "/dashboard/gestao-tickets",
      icon: <GestaoIcon />,
    },
    {
      name: "Chat e Assistente Virtual",
      href: "/dashboard/chat-assistente",
      icon: <ChatIcon />,
    },
    {
      name: "Simulador",
      href: "/dashboard/simulador",
      icon: <CalculatorIcon />,
    },
  ];

  const getCurrentPageName = () => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="min-h-screen bg-dashboard">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 bg-aside-header px-4 shadow-sm shadow-black/50 rounded-tr-4xl rounded-br-4xl">
        <div className="flex items-center justify-center h-16 bg-aside-header">
          <div className="text-2xl mt-2">
            <img src="/assets/images/logo-dashboard.png" alt="logo" />
          </div>
        </div>

        <nav className="mt-32 mx-auto">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                pathname === item.href ? "bg-gray-700 text-white" : ""
              }`}
            >
              <span
                className={`text-xl p-4 rounded-xl transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-icons"
                }`}
              >
                {item.icon}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-16">
        <header className="bg-aside-header shadow-sm">
          <div className="flex items-center justify-between h-20 px-10">
            <div className="flex items-center">
              <h1 className="text-xl font-montserrat font-semibold text-white">
                {getCurrentPageName()}
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={openModal}
                className="flex items-center gap-2 py-4 shadow-primary shadow-md bg-primary hover:bg-primary/90 text-white px-4 rounded-full font-medium"
              >
                <PlusIcon width={16} height={16} />
                <p>Novo Ticket</p>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-10">
          {pathname === "/dashboard" ? (
            <Dashboard
              tickets={tickets}
              details={details}
              loading={loading}
              error={error}
              refetch={refetch}
            />
          ) : (
            children
          )}
        </main>
      </div>

      {/* Modal de Novo Ticket */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Novo Ticket">
        <NewTicketForm
          onSubmit={createTicket}
          onCancel={closeModal}
          isLoading={isCreating}
        />
      </Modal>
    </div>
  );
}
