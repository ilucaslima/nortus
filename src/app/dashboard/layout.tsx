"use client";

import { useState } from "react";

import { LogoIcon } from "@/components/ui/Icons";
import { usePathname, useRouter } from "next/navigation";

import Cookies from "js-cookie";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    {
      name: "Gestão de Tickets",
      href: "/dashboard/gestao-tickets",
      icon: "🎫",
    },
    {
      name: "Chat e Assistente Virtual",
      href: "/dashboard/chat-assistente",
      icon: "💬",
    },
    { name: "Simulador", href: "/dashboard/simulador", icon: "🎮" },
  ];

  // Encontrar o nome da página atual
  const getCurrentPageName = () => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.name : "Dashboard";
  };

  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-dashboard">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gray-900 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer flex items-center justify-center w-full"
          >
            {sidebarOpen ? (
              <LogoIcon width={120} height={40} />
            ) : (
              <div className="text-2xl">📊</div>
            )}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                sidebarOpen ? "px-4" : "px-4 justify-center"
              } ${pathname === item.href ? "bg-gray-700 text-white" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </a>
          ))}
        </nav>

        <div
          className={`absolute bottom-0 w-full p-4 ${
            sidebarOpen ? "" : "px-2"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`w-full flex items-center py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 ${
              sidebarOpen ? "px-4" : "px-2 justify-center"
            }`}
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </div>

      {/* Header */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <header className="bg-aside-header shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-montserrat font-semibold text-white">
                {getCurrentPageName()}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <span className="text-gray-700 font-medium">Usuário</span>
              </div> */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
