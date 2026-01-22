"use client";
import { ReactElement } from "react";
import { FieldValues, Path } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export type UiFormFileUploadProps<T extends FieldValues> = {
    name: Path<T>;
    title?: string;
    label?: string;
    description?: string;
    required?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    className?: string;
} & React.ComponentPropsWithoutRef<"input">;

export function uuid(): string {
    return uuidv4();
}