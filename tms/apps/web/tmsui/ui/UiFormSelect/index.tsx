"use client"
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

type Ioption = {
    label: string;
    value: string;
}

export type UiFormSelectProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    options: Ioption[]
} & React.ComponentPropsWithoutRef<"select">;


export const UiFormSelect = <T extends FieldValues>({
    name,
    options,
    label,
    className,
    ...rest
}: UiFormSelectProps<T>) => {
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
                        <select
                            className={cn("block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500", className)}
                            id={label}
                            {...field}
                            {...rest}
                        >
                            {options.map((option) => {
                                return (<option key={option.value} value={option.value}>{option.label}</option>)
                            })}
                        </select>
                        {error && <label className="block text-sm font-medium text-red-700 mb-2">{error?.message}</label>}
                    </div>)
            }}
        />
    );
};

UiFormSelect.displayName = "UiFormSelect";