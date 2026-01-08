"use client"
import { cn } from "@/tmsui/utility";
import { ReactElement } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { useFormContext } from "../useFormContext";

/**
 * @param endIcon: ReactElement
 * @description: End icon for the input field
 * @example: <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
 */

export type UiFormYTUploadProps<T extends FieldValues> = {
    name: Path<T>;
    title?: string;
    label?: string;
    description?: string;
    required?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    className?: string;
} & React.ComponentPropsWithoutRef<"input">;

export const UiFormYTUpload = <T extends FieldValues>({
    name,
    title,
    label,
    description,
    required,
    startIcon,
    endIcon,
    className,
    ...rest
}: UiFormYTUploadProps<T>) => {
    const { control, setValue } = useFormContext<T>();


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const ytUrl = e.target.value;
        const ytVideoDetailsResponse = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(ytUrl)}&format=json`)
        const ytVideoDetailsData = await ytVideoDetailsResponse.json()
        if (ytVideoDetailsData) {
            setValue(name as Path<T>, {
                fileName: ytVideoDetailsData.title,
                playbackUrl: ytUrl,
            } as PathValue<T, Path<T>>);
        }
    }

    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                            {title}
                        </h4>
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
                                onChange={handleFileChange}
                                {...rest}
                            />
                            {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}

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

UiFormYTUpload.displayName = "UiFormYTUpload";