"use client"
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

export type UiFormTextAreaProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
} & React.ComponentPropsWithoutRef<"textarea">;



export const UiFormTextArea = <T extends FieldValues>({
    name,
    label,
    required,
    ...rest
}: UiFormTextAreaProps<T>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div>
                        {label && <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
                        <textarea
                            className={cn(
                                "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                                error && "border-red-700 focus:ring-red-600 focus:border-red-600",
                            )}
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

UiFormTextArea.displayName = "UiFormTextArea";