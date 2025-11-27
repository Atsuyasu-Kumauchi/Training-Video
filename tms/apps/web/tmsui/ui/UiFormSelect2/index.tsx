// File: src/components/UiFormSelect2.tsx
"use client";

import { Controller, FieldValues, Path } from "react-hook-form";
import Select from "react-select";
import { useFormContext } from "../useFormContext";
export type IOption = { value: string; label: string };

export type UiFormSelectProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    options: IOption[];
};

export function UiFormSelect2<T extends FieldValues>({
    name,
    label,
    required,
    options,
}: UiFormSelectProps<T>) {
    const { control, watch, formState: { errors } } = useFormContext<T>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className="space-y-1">
                        {label && (
                            <label
                                htmlFor={String(name)}
                                className="block text-sm font-medium text-gray-700"
                            >
                                {label}
                            </label>
                        )}

                        <Select<IOption, true>
                            name={field.name}
                            inputId={String(name)}
                            isMulti
                            options={options}
                            value={(field.value as IOption[] | undefined) ?? []}
                            onChange={(val) => field.onChange(val as IOption[])}
                            onBlur={field.onBlur}
                            classNames={{
                                control: ({ isFocused }) =>
                                    `border rounded-md shadow-sm ${isFocused
                                        ? "border-blue-500 ring-2 ring-blue-500"
                                        : "border-gray-300"
                                    } ${error ? "border-red-500 ring-red-500" : ""}`,
                                option: ({ isFocused, isSelected }) =>
                                    `px-3 py-2 cursor-pointer ${isSelected
                                        ? "bg-blue-500 text-white"
                                        : isFocused
                                            ? "bg-blue-100 text-black"
                                            : "bg-white text-black"
                                    }`,
                            }}
                        />

                        {error?.message && (
                            <p className="text-sm text-red-600">{error.message}</p>
                        )}
                    </div>
                )
            }}
        />
    );
}
