import { PlanIndicator } from "@/types/simulator";

interface PlanCardProps {
  plan: PlanIndicator;
  isRecommended?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function PlanCard({
  plan,
  isRecommended,
  isSelected,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={`relative p-6 rounded-2xl bg-gray-800 border cursor-pointer transition-all hover:scale-105 ${
        isSelected ? "border-blue-500 bg-gray-700" : "border-gray-600"
      } ${isRecommended ? "border-blue-400" : ""}`}
      onClick={onSelect}
    >
      <div className="">
        <div className="flex justify-between">
          <p className="text-white font-semibold text-lg mb-6">{plan.name}</p>
          {isRecommended && (
            <div className="">
              <span className="bg-green-500 text-dashboard text-xs px-3 py-1 rounded-full font-medium">
                Recomendado
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <span className="text-white text-3xl font-bold">
            R$ {plan.value.toFixed(2).replace(".", ",")}
          </span>
          <div className="text-gray-400 text-sm mt-6">Por mês</div>
        </div>
      </div>
    </div>
  );
}
