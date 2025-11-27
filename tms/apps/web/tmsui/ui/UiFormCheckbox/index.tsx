"use client"
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

export type UiFormCheckboxProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;



export const UiFormCheckbox = <T extends FieldValues>({
    name,
    label,
    className,
    ...rest
}: UiFormCheckboxProps<T>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" className={cn("h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded", className)}
                            id={label}
                            {...field}
                            {...rest}
                        />
                        <label htmlFor={label} className="ml-2 text-sm text-gray-700">{label}</label>
                        {error && <small className="block text-sm font-medium text-red-700">{error?.message}</small>}
                    </div>
                )
            }}
        />
    );
};

UiFormCheckbox.displayName = "UiFormCheckbox";