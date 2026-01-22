"use client"
import { cn } from "@/tmsui/utility";
import { ReactElement } from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

/**
 * @param endIcon: ReactElement
 * @description: End icon for the input field
 * @example: <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
 */

export type UiFormTextProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    className?: string;
} & React.ComponentPropsWithoutRef<"input">;


export const sizeClasses = {
    sm: "text-sm py-2 px-2",
    md: "text-base py-5 px-5",
    lg: "text-lg py-7 px-7",
};


export const UiFormInput = <T extends FieldValues>({
    name,
    label,
    required,
    startIcon,
    endIcon,
    className,
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
                        {label && <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
                        <div className="relative">
                            {startIcon && (
                                <div
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                                    style={{ cursor: "pointer" }}
                                >
                                    {startIcon}
                                </div>
                            )}
                            <input
                                id={label}
                                className={cn(
                                    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200",
                                    startIcon && "pl-10",
                                    endIcon && "pr-10",
                                    error && "border-red-700 focus:ring-red-600 focus:border-red-600",
                                    className
                                )}
                                {...field}
                                {...rest}
                            />

                            {endIcon && (
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    style={{ cursor: "pointer" }}
                                >
                                    {endIcon}
                                </div>
                            )}
                        </div>
                        {error && <label className="block text-sm font-medium text-red-700 mb-2 mt-1">{error?.message}</label>}
                    </div>
                )
            }}
        />
    );
};

UiFormInput.displayName = "UiFormInput";