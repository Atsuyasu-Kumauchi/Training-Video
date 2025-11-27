"use client"
import { ReactNode } from "react";
import {
    ArrayPath,
    FieldValues,
    useFieldArray,
    UseFieldArrayReturn,
} from "react-hook-form";
import { useFormContext } from "../useFormContext";

type UiFormFiledArrayProps<TFormValues extends FieldValues> = {
    children: (fileds: UseFieldArrayReturn<TFormValues, ArrayPath<TFormValues>>) => ReactNode;
    name: ArrayPath<TFormValues>;
};

export function UiFormFiledArray<TFormValues extends FieldValues>({
    name,
    children,
}: UiFormFiledArrayProps<TFormValues>) {
    const { control } = useFormContext<TFormValues>();
    const filedArray = useFieldArray({ control, name });
    return children(filedArray);
}


UiFormFiledArray.displayName = "UiFormFiledArray";