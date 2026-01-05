"use client"
import { AuthServer, deleteAuthToken, getAuthToken, setAuthToken } from "@/tmsui/core";
import { cn, wait } from "@/tmsui/utility";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { useFormContext } from "../useFormContext";
import { UiFormFileUploadProps, uuid } from "./fileUpload.type";

/**
 * @param endIcon: ReactElement
 * @description: End icon for the input field
 * @example: <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
 */


export const UiFormFileUpload = <T extends FieldValues>({
    name,
    title,
    label,
    description,
    required,
    startIcon,
    endIcon,
    className,
    ...rest
}: UiFormFileUploadProps<T>) => {
    const { control, setValue } = useFormContext<T>();
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(50);


    const uploadMutation = useMutation({
        mutationKey: ['upload-file'],
        mutationFn: async (file: File) => {
            const response = await AuthServer({
                method: 'POST',
                url: 'videos/uploads',
                data: file,
                headers: {
                    "Content-Type": "application/octet-stream",
                    'x-file-name': encodeURIComponent(file.name),
                    'x-upload-id': await getAuthToken('x-upload-id') || '',
                },
                onUploadProgress: (event) => {
                    if (!event.total) return;
                    const percent = Math.round((event.loaded * 100) / event.total);
                    setProgress(percent);
                },
            })
            await wait(1000);
            return response.data;
        },
        onError: (error) => {
            console.log(error, 'error');
        },
        onSettled: async (data, error) => {
            if (error) {
                return;
            }
            if (data) {
                setValue(name as Path<T>, data as PathValue<T, Path<T>>);
                await deleteAuthToken('x-upload-id');
            }
        }
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFile(file);
            await setAuthToken({ name: "x-upload-id", value: uuid() });
            await uploadMutation.mutateAsync(file)
        }
    }
    return (
        <Controller
            name={name}
            defaultValue={undefined}
            control={control}
            render={({ fieldState: { error } }) => {
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
                            {/* TODO: Add file upload input */}
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className={cn("block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500", className)}
                                        onChange={handleFileChange}
                                        {...rest}
                                    />
                                    {uploadMutation.isPending && (
                                        <div className="mt-3 w-full">
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className="h-full bg-blue-600 transition-all duration-200 ease-out"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {description && <p className="mt-1 text-sm text-gray-500"> {description} </p>}
                                </div>

                                {/* File Preview */}
                                {/* <div id="filePreview" className="bg-gray-50 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">
                                            {videoList.form.fileInformation}:
                                        </h5>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div>
                                                <strong>{videoList.form.name}:</strong> <span id="fileName" />
                                            </div>
                                            <div>
                                                <strong>{videoList.form.size}:</strong> <span id="fileSize" />
                                            </div>
                                            <div>
                                                <strong>{videoList.form.type}:</strong> <span id="fileType" />
                                            </div>
                                        </div>
                                    </div> */}
                            </div>
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

UiFormFileUpload.displayName = "UiFormFileUpload";