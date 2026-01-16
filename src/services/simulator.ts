import { api } from "@/config/api";
import { mockSimulatorResponse } from "@/data/mockSimulator";
import { SimulatorFormData, SimulatorResponse } from "@/types/simulator";
import Cookies from "js-cookie";

export const simulatorService = async (
  formData?: SimulatorFormData
): Promise<SimulatorResponse> => {
  try {
    const token = Cookies.get("auth-token") || "";
    const response = await api.post("/nortus-v1/simulador-planos", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as SimulatorResponse;
  } catch (error) {
    console.warn("API não disponível, usando dados mock:", error);
    return mockSimulatorResponse;
  }
};
