import { ReactNode } from "react";
import { type StepError, useSteperContext } from "./steper.context";

export type StepProps = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError>;
};
export const Step = ({ children }: StepProps) => {
  const { currentStep, stepErrors } = useSteperContext();
  const error = stepErrors[currentStep];
  return (
    <>
      <div className="my-8">
        {error?.hasError && error.message && (
          <div>
            <p className="text-red-600 ">{error.message}</p>
          </div>
        )}
        <div>{children}</div>
      </div>
    </>
  );
};
