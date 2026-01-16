import { SimulatorResponse } from "@/types/simulator";

export const mockSimulatorResponse: SimulatorResponse = {
  includedBenefits: ["Tudo do básico", "Carro reserva", "Vidros"],
  plansIndicators: [
    {
      name: "Básico",
      conversion: 75,
      roi: 80,
      value: 89.9,
    },
    {
      name: "Intermediário",
      conversion: 48,
      roi: 114,
      value: 145.9,
    },
    {
      name: "Premium",
      conversion: 25,
      roi: 176,
      value: 225.9,
    },
  ],
};
