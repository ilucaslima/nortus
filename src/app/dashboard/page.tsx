"use client";

import { ClientMap } from "@/components";
import KPIChart from "@/components/KPIChart";
import SegmentChart from "@/components/SegmentChart";
import { fetchDashboardData } from "@/services/dashboard";
import { DashboardData, KPIType } from "@/types/dashboard";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeKPI, setActiveKPI] = useState<KPIType>("arpu");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard");
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Carregando dashboard...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full px-4 mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500 text-xl">
            {error || "Erro ao carregar dados"}
          </div>
        </div>
      </div>
    );
  }

  const getCurrentKPIData = () => {
    switch (activeKPI) {
      case "arpu":
        return data.kpisTrend.arpuTrend.data;
      case "conversion":
        return data.kpisTrend.conversionTrend.data;
      case "churn":
        return data.kpisTrend.churnTrend.data;
      case "retention":
        return data.kpisTrend.retentionTrend.data;
      default:
        return data.kpisTrend.arpuTrend.data;
    }
  };

  return (
    <div className="w-full px-4 mx-auto">
      <div className="flex w-full gap-4 justify-between mb-6">
        <KPIChart
          labels={data.kpisTrend.labels}
          data={getCurrentKPIData()}
          activeKPI={activeKPI}
          onKPIChange={setActiveKPI}
          kpisData={{
            arpu: data.kpisTrend.arpuTrend,
            conversion: data.kpisTrend.conversionTrend,
            churn: data.kpisTrend.churnTrend,
            retention: data.kpisTrend.retentionTrend,
          }}
        />

        <SegmentChart segments={data.segments} />
      </div>

      <div className="w-full">
        <ClientMap />
      </div>
    </div>
  );
};

export default Dashboard;
