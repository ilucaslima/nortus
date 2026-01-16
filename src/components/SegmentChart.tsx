"use client";

import { useEffect, useRef } from "react";

interface SegmentChartProps {
  segments: Array<{
    nome: string;
    valor: number;
  }>;
}

const SegmentChart = ({ segments }: SegmentChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const initChart = async () => {
      if (
        chartRef.current &&
        segments.length > 0 &&
        typeof window !== "undefined"
      ) {
        const ApexCharts = (await import("apexcharts")).default;

        const options = {
          series: [
            {
              name: "Clientes por segmento",
              data: segments.map((segment) => segment.valor),
            },
          ],
          chart: {
            height: 400,
            type: "bar" as const,
            background: "transparent",
            toolbar: {
              show: false,
            },
          },
          colors: ["#4ECDC4"],
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: "#4ECDC4",
                  opacity: 0.9,
                },
                {
                  offset: 100,
                  color: "#2A9D8F",
                  opacity: 0.6,
                },
              ],
            },
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              columnWidth: "60%",
            },
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
            categories: segments.map((segment) => segment.nome.split(" ")[0]), // Primeira palavra para economizar espaço
            labels: {
              style: {
                colors: "#9CA3AF",
                fontSize: "12px",
              },
              rotate: -45,
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
                return `${value}%`;
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
                return `${value}% dos clientes`;
              },
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
  }, [segments]);

  return (
    <div className="bg-gray-900 h-full rounded-2xl border border-blue-500/20 p-8 w-2/5">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-semibold">Segmentos</h2>
        <div className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default SegmentChart;
