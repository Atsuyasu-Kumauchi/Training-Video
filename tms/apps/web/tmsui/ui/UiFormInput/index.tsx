"use client"
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

export type UiFormTextProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;


export const sizeClasses = {
    sm: "text-sm py-2 px-2",
    md: "text-base py-5 px-5",
    lg: "text-lg py-7 px-7",
};


export const UiFormInput = <T extends FieldValues>({
    name,
    label,
    ...rest
}: UiFormTextProps<T>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div>
                        {label && <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
                        <input
                            className={cn("flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500")}
                            id={label}
                            autoComplete="true"
                            {...field}
                            {...rest}
                        />
                        {error && <label className="block text-sm font-medium text-red-700 mb-2">{error?.message}</label>}
                    </div>
                )
            }}
        />
    );
};

UiFormInput.displayName = "UiFormInput";