"use client";

import { PlanCard } from "@/components/PlanCard";
import { Slider } from "@/components/Slider";
import { useSimulator } from "@/hooks/useSimulator";
import { useState } from "react";

export default function Simulador() {
  const {
    data,
    error,
    formData,
    additionalCoverages,
    updateVehicleValue,
    updateClientAge,
    toggleAdditionalCoverage,
    getRecommendedPlan,
  } = useSimulator();

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const recommendedPlan = getRecommendedPlan();

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`;
  };

  const formatAge = (value: number) => {
    return `${value} anos`;
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Erro ao carregar simulação: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dashboard">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 p-6 rounded-3xl bg-card-bg">
            <p className="text-3xl font-bold text-white mb-4">
              Planos personalizados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {data?.plansIndicators?.map((plan) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  isRecommended={recommendedPlan?.name === plan.name}
                  isSelected={selectedPlan === plan.name}
                  onSelect={() =>
                    setSelectedPlan(
                      selectedPlan === plan.name ? null : plan.name
                    )
                  }
                />
              ))}
            </div>

            <Slider
              label="Valor do veículo"
              value={formData.vehicleValue}
              min={10000}
              max={500000}
              step={1000}
              formatValue={formatCurrency}
              onChange={updateVehicleValue}
            />

            <Slider
              label="Idade do Cliente"
              value={formData.clientAge}
              min={18}
              max={90}
              formatValue={formatAge}
              onChange={updateClientAge}
            />

            <div>
              <p className="text-white font-semibold mb-4">
                Coberturas Adicionais
              </p>
              <div className="space-y-3">
                {additionalCoverages.map((coverage) => (
                  <div
                    key={coverage.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={coverage.id}
                        checked={coverage.checked}
                        onChange={() => toggleAdditionalCoverage(coverage.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={coverage.id}
                        className="text-white cursor-pointer"
                      >
                        {coverage.label}
                      </label>
                    </div>
                    <span className="font-medium">
                      + R$ {coverage.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 grid grid-rows-[1fr_3fr]">
            <div className="bg-card-bg p-6 rounded-lg">
              <p className="text-white text-2xl font-semibold mb-4">
                Benefícios Inclusos
              </p>
              <div className="space-y-2 flex items-center gap-2">
                {data?.includedBenefits?.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-black/10 py-2 px-4 space-x-2 rounded-full border border-green-strong"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card-bg p-6 rounded-lg">
              <p className="text-white font-semibold mb-4">Indicadores</p>
              <div className="space-y-4 grid grid-rows-3">
                {data?.plansIndicators?.map((plan) => (
                  <div
                    key={plan.name}
                    className={`p-6 flex flex-col justify-center rounded-2xl border border-green-strong bg-card-bg`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-medium text-xl">
                        {plan.name}
                      </p>
                      <span className="text-white font-bold">
                        R$ {plan.value.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm flex gap-4">
                      <div className="flex gap-2">
                        <span className="text-gray-400">Conversão:</span>
                        <span className="text-green-400">
                          {plan.conversion}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-green-400">{plan.roi}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
