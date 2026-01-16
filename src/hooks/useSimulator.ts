import { simulatorService } from "@/services";
import {
  AdditionalCoverage,
  SimulatorFormData,
  SimulatorResponse,
} from "@/types/simulator";
import { useCallback, useEffect, useState } from "react";

export const useSimulator = () => {
  const [data, setData] = useState<SimulatorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SimulatorFormData>({
    vehicleValue: 50000,
    clientAge: 28,
    additionalCoverages: {
      theftAndBurglary: true,
      collisionDamage: true,
      fireProtection: true,
      naturalPhenomena: false,
    },
  });

  const [additionalCoverages, setAdditionalCoverages] = useState<
    AdditionalCoverage[]
  >([
    {
      id: "theftAndBurglary",
      label: "Cobertura contra roubo e furto",
      price: 25.0,
      checked: true,
    },
    {
      id: "collisionDamage",
      label: "Danos por colisão",
      price: 35.0,
      checked: true,
    },
    {
      id: "fireProtection",
      label: "Cobertura contra incêndio",
      price: 20.0,
      checked: true,
    },
    {
      id: "naturalPhenomena",
      label: "Fenômenos naturais (granizo, enchente)",
      price: 30.0,
      checked: false,
    },
  ]);

  const updateVehicleValue = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, vehicleValue: value }));
  }, []);

  const updateClientAge = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, clientAge: value }));
  }, []);

  const toggleAdditionalCoverage = useCallback(
    (coverageId: keyof SimulatorFormData["additionalCoverages"]) => {
      setAdditionalCoverages((prev) =>
        prev.map((coverage) =>
          coverage.id === coverageId
            ? { ...coverage, checked: !coverage.checked }
            : coverage
        )
      );

      setFormData((prev) => ({
        ...prev,
        additionalCoverages: {
          ...prev.additionalCoverages,
          [coverageId]: !prev.additionalCoverages[coverageId],
        },
      }));
    },
    []
  );

  const fetchSimulation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await simulatorService(formData);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  // Auto-fetch when form data changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSimulation();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchSimulation]);

  const getRecommendedPlan = useCallback(() => {
    if (!data?.plansIndicators) return null;

    // Find the plan with the best balance of conversion and ROI
    return data.plansIndicators.reduce((best, current) => {
      const bestScore = best.conversion * 0.6 + best.roi * 0.4;
      const currentScore = current.conversion * 0.6 + current.roi * 0.4;
      return currentScore > bestScore ? current : best;
    });
  }, [data]);

  const getTotalAdditionalCost = useCallback(() => {
    return additionalCoverages
      .filter((coverage) => coverage.checked)
      .reduce((total, coverage) => total + coverage.price, 0);
  }, [additionalCoverages]);

  return {
    data,
    loading,
    error,
    formData,
    additionalCoverages,
    updateVehicleValue,
    updateClientAge,
    toggleAdditionalCoverage,
    fetchSimulation,
    getRecommendedPlan,
    getTotalAdditionalCost,
  };
};
