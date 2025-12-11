import { createContext, useContext } from "react";

export type StepError = {
  hasError: boolean;
  message?: string;
};

export type StepConfig = {
  label?: string;
  icon?: React.ReactNode;
};

export type StepperContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalStep: number;
  stepErrors: Record<number, StepError>;
  setStepErrors: (errors: Record<number, StepError>) => void;
};

export const StepperContext = createContext<StepperContextType | null>(null);

export const useSteperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useSteperContext must be use within a StepperProvide");
  }
  return context;
};
