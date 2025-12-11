import { Children, isValidElement } from "react";
import { Step, type StepProps } from "./Step";
import { type StepError, useSteperContext } from "./steper.context";

export const useStepContent = (children: React.ReactNode) => {
  const { totalStep, currentStep, setCurrentStep, stepErrors, setStepErrors } =
    useSteperContext();

  const steps = getSteps(children);

  const validateStep = async (step: number): Promise<StepError> => {
    const currentChild = steps[step - 1] as React.ReactElement<StepProps>;
    if (currentChild.props.validate) {
      return await currentChild.props.validate();
    }
    return { hasError: false };
  };

  const handleNext = async (
    onComplete?: () => void | Promise<void>
  ): Promise<void> => {
    const error = await validateStep(currentStep);
    if (error.hasError) {
      setStepErrors({ [currentStep]: error });
      return;
    }

    setStepErrors({ [currentStep]: { hasError: false } });

    if (currentStep === totalStep && onComplete) {
      return await onComplete();
    }

    if (currentStep < totalStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    totalStep,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
  };
};

export const getSteps = (children: React.ReactNode) => {
  return Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step
  );
};
