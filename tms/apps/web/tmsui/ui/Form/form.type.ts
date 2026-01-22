import { zodInfer } from "@/tmsui/zodValidation";
import { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { Control, FieldValues, FormState, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";

export type TUiFormRef<T extends FieldValues> = {
    getValues: () => T;
    reset: (values?: Partial<T>) => void;
    setValue: (name: keyof T, value: T[keyof T]) => void;
    formState: FormState<T>;
    control: Control<T>;
    form: UseFormReturn<T>;
    onClear: () => void;
    setError: UseFormReturn<T>["setError"];
    trigger: UseFormReturn<T>["trigger"];
};


export type TFormHandlerSubmit<T> = SubmitHandler<T>

export type TUiFormProps<TSchema extends ZodType<FieldValues>> = {
    schema: TSchema;
    initialValues: Partial<zodInfer<TSchema>>;
    onSubmit: SubmitHandler<zodInfer<TSchema>>;
    children: ReactNode;
    ref: Ref<TUiFormRef<zodInfer<TSchema>>>;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
