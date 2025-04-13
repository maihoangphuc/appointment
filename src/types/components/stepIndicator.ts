export interface Step {
  number: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
} 