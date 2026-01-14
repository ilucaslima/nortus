"use client";

import { Button, Input } from "@/components";

import { LogoIcon } from "@/components/ui/Icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-8">
        <div className="w-full m-auto max-w-md">
          <LogoIcon className="mb-10" />

          <p className="text-4xl mb-2 font-space-grotesk">Login</p>
          <p className="text-font-span font-inter mb-8">
            Entre com suas credenciais para acessar a sua conta.
          </p>

          <div className="space-y-6">
            <Input
              type="text"
              id="usuario"
              label="Usuário"
              required
              helperText="Insira o seu e-mail, CPF ou passaporte."
            />
            <Input type="password" id="senha" label="Senha" required />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded focus:ring-blue-500 text-blue-600"
                />
                <span className="text-sm text-gray-300">
                  Lembrar meu usuário
                </span>
              </label>
              <a href="#" className="text-primary text-sm hover:text-blue-300">
                Esqueci minha senha
              </a>
            </div>

            <Button className="w-full">Entrar</Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <img src="/assets/images/login.png" alt="Login" className="" />
      </div>
    </div>
  );
}
