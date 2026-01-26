"use client"
import { cn } from "@/tmsui/utility";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useState } from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useFormContext } from "../useFormContext";

export type UiFormInputPasswordProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    getPasswordStrength?: (password: string) => { strength: string; message: string };
    startIcon?: ReactElement;
} & React.ComponentPropsWithoutRef<"input">;

export const UiFormInputPassword = <T extends FieldValues>({
    name,
    label,
    required,
    placeholder,
    getPasswordStrength,
    startIcon,
    ...rest
}: UiFormInputPasswordProps<T>) => {
    const { control } = useFormContext<T>();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div>
                        {label && (
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {label}
                            </label>
                        )}
                        <div className="relative">
                            {startIcon &&
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {startIcon}
                                </div>
                            }
                            <input
                                type={showPassword ? "text" : "password"}
                                id={name}
                                required={required}
                                placeholder={placeholder}
                                className={cn("w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200",
                                    startIcon && "pl-10",
                                    error && "focus:border-red-500 focus:ring-red-500"
                                )}
                                {...field}
                                {...rest}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="fas fa-eye text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>

                        {/* {getPasswordStrength && <PasswordStrength getPasswordStrength={getPasswordStrength} password={field.value} />} */}

                        {error && (
                            <small className="block text-sm font-medium text-red-700 mt-1">
                                {error.message}
                            </small>
                        )}

                    </div>
                )
            }}
        />
    );
};

UiFormInputPassword.displayName = "UiFormInputPassword";

function PasswordStrength({
    getPasswordStrength,
    password,
}: {
    getPasswordStrength?: (password: string) => { strength: string; message: string },
    password: string
}) {
    if (!getPasswordStrength) return null;

    const { strength, message } = getPasswordStrength(password || "");
    let barWidth = "0%";
    let barColor = "bg-red-500";
    if (strength === "strong") {
        barWidth = "100%";
        barColor = "bg-green-500";
    } else if (strength === "medium") {
        barWidth = "66%";
        barColor = "bg-yellow-500";
    } else if (strength === "weak") {
        barWidth = "33%";
        barColor = "bg-red-500";
    }

    return (
        <div className="mt-2">
            <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                        className={`${barColor} h-2 rounded-full transition-all duration-300`}
                        id="passwordStrength"
                        style={{ width: barWidth }}
                    />
                </div>
                <span className="text-xs text-gray-500" id="passwordStrengthText">
                    {message || "weak"}
                </span>
            </div>
        </div>
    );
}