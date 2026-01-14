"use client";

import { Button, Input } from "@/components";
import { LogoIcon } from "@/components/ui/Icons";
import { api } from "@/config/api";
import { registerSchema, type RegisterFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = Omit<RegisterFormData, "challengeLevel"> & {
  challengeLevel?: number;
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      challengeLevel: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await api.post("/users", data);

      toast.success("Conta criada com sucesso! Faça login para continuar.");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erro ao criar conta. Tente novamente.";
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

          <p className="text-4xl mb-2 font-space-grotesk">Registro</p>
          <p className="text-font-span font-inter mb-8">
            Crie sua conta para acessar o sistema.
          </p>

          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            <Input
              type="text"
              id="name"
              label="Nome"
              required
              helperText="Digite seu nome completo."
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              type="email"
              id="email"
              label="E-mail"
              required
              helperText="Digite um e-mail válido."
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              type="password"
              id="password"
              label="Senha"
              required
              helperText="Mínimo de 6 caracteres."
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Nível de Desafio <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-4 border border-border rounded-lg text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("challengeLevel", { valueAsNumber: true })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <option key={level} value={level}>
                    Nível {level}
                  </option>
                ))}
              </select>
              {errors.challengeLevel && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.challengeLevel.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <a href="/" className="text-primary text-sm hover:text-blue-300">
                Já tem uma conta? Faça login
              </a>
            </div>

            <Button type="submit" loading={isLoading} className="w-full">
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <img src="/assets/images/login.png" alt="Register" className="" />
      </div>
    </div>
  );
}
