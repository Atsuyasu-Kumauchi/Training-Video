"use client"
import { cn } from "@/tmsui/utility";
import { Controller, FieldValues, Path } from "react-hook-form";
import { IOption } from "../shared/types";
import { useFormContext } from "../useFormContext";

export type UiFormSelectProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    options: IOption[];
    placeholder?: string;
} & React.ComponentPropsWithoutRef<"select">;

// Generates a random key string of a given length
export function generateRandomKey(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}


export const UiFormSelect = <T extends FieldValues>({
    name,
    options,
    label,
    className,
    required,
    placeholder,
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
                        {label && <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
                        <select
                            className={cn(
                                "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500",
                                className,
                                error && "border-red-500 focus:ring-red-500 focus:border-red-500"
                            )}
                            id={label}
                            {...field}
                            {...rest}
                        >
                            <option value="">{placeholder}</option>
                            {options?.map((option: IOption) => {
                                return (<option key={`${option.value}-${generateRandomKey()}`} value={option.value as string | number}>{option.label}</option>)
                            })}
                        </select>
                        {error && <label className="block text-sm font-medium text-red-700 mb-2 mt-1">{error?.message}</label>}
                    </div>)
            }}
        />
    );
};

UiFormSelect.displayName = "UiFormSelect";