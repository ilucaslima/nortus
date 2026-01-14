"use client";

import { Button, Input } from "@/components";
import { LogoIcon } from "@/components/ui/Icons";
import { api } from "@/config/api";
import { loginSchema, type LoginFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Cookies from "js-cookie";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", data);

      Cookies.set("auth-token", response.data.access_token, { expires: 1 });

      toast.success("Login realizado com sucesso!");

      router.push("/dashboard");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      toast.error(message);
      console.log(error.response?.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-8">
        <div className="w-full m-auto max-w-md">
          <LogoIcon className="mb-10" />

          <p className="text-4xl mb-2 font-space-grotesk">Login</p>
          <p className="text-font-span font-inter mb-8">
            Entre com suas credenciais para acessar a sua conta.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              type="text"
              id="email"
              label="Usuário"
              required
              helperText="Insira o seu e-mail, CPF ou passaporte."
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              type="password"
              id="password"
              label="Senha"
              required
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer gap-2">
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

            <div className="flex flex-col space-y-3">
              <Button type="submit" loading={isLoading} className="w-full">
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-gray-300">
                  Não tem uma conta?{" "}
                </span>
                <a
                  href="/registro"
                  className="text-primary text-sm hover:text-blue-300 font-medium"
                >
                  Crie uma agora
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <img src="/assets/images/login.png" alt="Login" className="" />
      </div>
    </div>
  );
}
