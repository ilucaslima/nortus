"use client";

import { Button, Input, Select, TextArea } from "@/components";
import { newTicketSchema, type NewTicketFormData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface NewTicketFormProps {
  onSubmit: (data: NewTicketFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const NewTicketForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: NewTicketFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewTicketFormData>({
    resolver: zodResolver(newTicketSchema),
  });

  const handleFormSubmit = (data: NewTicketFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <p className="text-sm text-[#F6F8FC] mb-6">
        Preencha os dados abaixo para registrar um novo ticket na plataforma.
      </p>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Nome do cliente
        </label>
        <Input
          {...register("clientName")}
          placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
          error={errors.clientName?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Email
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="E-mail de contato para atualizações e resposta"
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Prioridade
        </label>
        <Select
          {...register("priority")}
          placeholder="Selecione o nível de urgência do atendimento"
          options={[
            { value: "Baixa", label: "Baixa" },
            { value: "Média", label: "Média" },
            { value: "Alta", label: "Alta" },
            { value: "Urgente", label: "Urgente" },
          ]}
          error={errors.priority?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Responsável
        </label>
        <Select
          {...register("responsible")}
          placeholder="Quem será o responsável por esse ticket"
          options={[
            { value: "joao", label: "João Silva" },
            { value: "maria", label: "Maria Santos" },
            { value: "pedro", label: "Pedro Costa" },
            { value: "ana", label: "Ana Oliveira" },
          ]}
          error={errors.responsible?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Assunto
        </label>
        <TextArea
          {...register("subject")}
          placeholder="Resumo breve do problema ou solicitação"
          rows={4}
          error={errors.subject?.message}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
};
