export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface SimulatorResponse {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export interface SimulatorFormData {
  vehicleValue: number;
  clientAge: number;
  additionalCoverages: {
    theftAndBurglary: boolean;
    collisionDamage: boolean;
    fireProtection: boolean;
    naturalPhenomena: boolean;
  };
}

export interface AdditionalCoverage {
  id: keyof SimulatorFormData["additionalCoverages"];
  label: string;
  price: number;
  checked: boolean;
}
