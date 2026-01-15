import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="bg-card-bg p-6 rounded-2xl border-border/30 border">
      <p className="font-montserrat">{title}</p>
      <div className="flex items-center justify-between mt-8">
        <b className="text-xl">{value}</b>
        {icon}
      </div>
    </div>
  );
};
