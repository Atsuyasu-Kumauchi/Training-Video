"use client";
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

export type UiFormRadioProps<T extends FieldValues> = {
  name: Path<T>;
  value: string | number; // each radio option’s value
  label?: React.ReactNode;
  required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

export const UiFormRadio = <T extends FieldValues>({
  name,
  value,
  label,
  className,
  ...rest
}: UiFormRadioProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-${value}`}
            value={value}
            checked={field.value === value}
            onChange={() => field.onChange(value)}
            className={cn(
              "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300",
              className
            )}
            {...rest}
          />
          <label
            htmlFor={`${name}-${value}`}
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {error && (
            <small className="block text-sm font-medium text-red-700">
              {error.message}
            </small>
          )}
        </div>
      )}
    />
  );
};

UiFormRadio.displayName = "UiFormRadio";
