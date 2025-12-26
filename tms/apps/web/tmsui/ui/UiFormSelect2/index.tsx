// File: src/components/UiFormSelect2.tsx
"use client";

import { Controller, FieldValues, Path } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { useFormContext } from "../useFormContext";


export type IOption = { value: string | number | boolean; label: string };

export type UiFormSelectProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    options: IOption[];
    isMulti?: boolean;
    placeholder?: string;
};

export function UiFormSelect2<T extends FieldValues>({
    name,
    label,
    required = false,
    options,
    isMulti = false,
    placeholder = "Select an option",
}: UiFormSelectProps<T>) {
    const { control, formState: { errors } } = useFormContext<T>();
    console.log(errors);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                let selectValue: IOption[] | IOption | null = null;
                if (isMulti) {
                    // Coerce field.value to a string array
                    const fieldArray: (string | number | boolean)[] = Array.isArray(field.value)
                        ? field.value
                        : field.value
                            ? [field.value]
                            : [];
                    selectValue = options.filter((o: IOption) =>
                        fieldArray.includes(o.value)
                    );
                } else {
                    selectValue = options.find((o: IOption) => o.value === field.value) ?? null;
                }

                return (
                    <div className="space-y-1">
                        {label && (
                            <label
                                htmlFor={String(name)}
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {label}
                                {required && <span className="text-red-500">*</span>}
                            </label>
                        )}
                        <Select<IOption, boolean>
                            isMulti={isMulti}
                            options={options}
                            placeholder={placeholder}
                            value={selectValue}
                            onChange={(selected) =>
                                field.onChange(
                                    isMulti
                                        ? (selected as MultiValue<IOption> ?? []).map((o: IOption) => o.value as string | number | boolean)
                                        : (selected as IOption)?.value as string | number | boolean ?? null
                                )
                            }
                            onBlur={field.onBlur}
                            classNames={{
                                control: ({ isFocused }) =>
                                    [
                                        "w-full px-1 py-0.5 rounded-lg transition-colors",
                                        "border bg-white shadow-sm",
                                        isFocused
                                            ? "border-primary-500 ring-2 ring-primary-500"
                                            : "border-gray-300",
                                        error ? "border-red-500 ring-2 ring-red-500" : "",
                                    ].join(" "),
                            }}
                            styles={{
                                control: base => ({
                                    ...base,
                                    borderRadius: "0.5rem",
                                }),
                            }}
                        />
                        {error?.message && (<p className="text-sm text-red-600">{error.message}</p>)}
                    </div>
                )
            }}
        />
    );
}
