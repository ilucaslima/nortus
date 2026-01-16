"use client";

import { KPIType } from "@/types/dashboard";
import { useEffect, useRef } from "react";

interface KPIChartProps {
  labels: string[];
  data: number[];
  activeKPI: KPIType;
  onKPIChange: (kpi: KPIType) => void;
  kpisData: {
    arpu: { name: string; data: number[] };
    conversion: { name: string; data: number[] };
    churn: { name: string; data: number[] };
    retention: { name: string; data: number[] };
  };
}

const KPIChart = ({ labels, data, activeKPI, onKPIChange }: KPIChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  const kpiConfig = {
    arpu: {
      color: "#4ECDC4",
      label: "ARPU",
      formatter: (value: number) => `R$ ${(value / 1000).toFixed(1)}k`,
    },
    conversion: {
      color: "#F97316",
      label: "Conversão",
      formatter: (value: number) => `${value}%`,
    },
    churn: {
      color: "#EF4444",
      label: "Churn",
      formatter: (value: number) => `${value}%`,
    },
    retention: {
      color: "#8B5CF6",
      label: "Retenção",
      formatter: (value: number) => `${value}%`,
    },
  };

  useEffect(() => {
    const initChart = async () => {
      if (chartRef.current && typeof window !== "undefined") {
        const ApexCharts = (await import("apexcharts")).default;

        const config = kpiConfig[activeKPI];

        const options = {
          series: [
            {
              name: config.label,
              data: data,
            },
          ],
          chart: {
            height: 400,
            type: "area" as const,
            background: "transparent",
            toolbar: {
              show: false,
            },
          },
          colors: [config.color],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              colorStops: [
                {
                  offset: 0,
                  color: config.color,
                  opacity: 0.8,
                },
                {
                  offset: 100,
                  color: config.color,
                  opacity: 0.3,
                },
              ],
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth" as const,
            width: 3,
            colors: [config.color],
          },
          grid: {
            borderColor: "#374151",
            strokeDashArray: 0,
            xaxis: {
              lines: {
                show: false,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          },
          xaxis: {
            categories: labels,
            labels: {
              style: {
                colors: "#9CA3AF",
                fontSize: "14px",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#9CA3AF",
                fontSize: "14px",
              },
              formatter: function (value: number) {
                return config.formatter(value);
              },
            },
          },
          tooltip: {
            enabled: true,
            theme: "dark",
            style: {
              fontSize: "12px",
            },
            y: {
              formatter: function (value: number) {
                return config.formatter(value);
              },
            },
            marker: {
              show: true,
            },
          },
          legend: {
            show: false,
          },
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      }
    };

    initChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data, activeKPI]);

  return (
    <div className="bg-card-bg h-full rounded-2xl border border-blue-500/20 p-8 w-3/5">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">
          Evolução dos KPI's
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => onKPIChange("retention")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              activeKPI === "retention"
                ? "bg-purple-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Retenção
          </button>
          <button
            onClick={() => onKPIChange("conversion")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              activeKPI === "conversion"
                ? "bg-orange-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Conversão
          </button>
          <button
            onClick={() => onKPIChange("churn")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              activeKPI === "churn"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Churn
          </button>
          <button
            onClick={() => onKPIChange("arpu")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              activeKPI === "arpu"
                ? "bg-teal-400 text-gray-900 font-medium"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            ARPU
          </button>
        </div>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default KPIChart;
