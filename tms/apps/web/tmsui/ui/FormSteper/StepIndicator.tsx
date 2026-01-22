
import { cn } from "@/tmsui/utility";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StepError } from "./steper.context";

type StepIndicatorProps = {
  step: number;
  error?: StepError;
  isActive: boolean;
  isComplete: boolean;
  index: number;
  stepperConfig?: { name: string }[];
};

export default function StepIndicator({
  step,
  error,
  isActive,
  isComplete,
  stepperConfig,
  index,
}: StepIndicatorProps) {
  const baseClassName =
    "w-8 h-8 rounded-full bg-white flex items-center justify-center z-10";

  if (error?.hasError) {
    return (
      <>
        <div className={cn(baseClassName)}>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <p className="text-sm mt-2 text-center">
          {stepperConfig?.[index]?.name}
        </p>
      </>
    );
  }

  if (isComplete) {
    return (
      <>
        <div
          className={cn(
            baseClassName,
            "border-2 border-green-600 bg-green-500 text-white"
          )}
        >
          ✔
        </div>
        <p className="text-base font-semibold mt-2 text-center">
          {stepperConfig?.[index]?.name}
        </p>
      </>
    );
  }

  if (isActive) {
    return (
      <>
        <div className={cn(baseClassName, "border-2 border-green-600")}>
          {step}
        </div>
        <p className="text-base font-semibold mt-2 text-center">
          {stepperConfig?.[index]?.name}
        </p>
      </>
    );
  }

  return (
    <>
      <div className={cn(baseClassName, "border-2 border-gray-300")}>
        {step}
      </div>
      <p className="text-base font-semibold mt-2 text-center">{stepperConfig?.[index]?.name}</p>
    </>
  );
}

StepIndicator.displayName = "StepIndicator";

export const StepConnector = ({ isCompleted = true }: { isCompleted: boolean }) => {
  return (
    <div
      className={cn(
        "absolute top-4 left-1/2 w-full h-0.5 -z-10",
        isCompleted ? "bg-green-500" : "bg-gray-300 "
      )}
      role="separator"
    />
  );
};

StepConnector.displayName = "StepConnector";
