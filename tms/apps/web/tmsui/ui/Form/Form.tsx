"use client";
import { zodInfer } from "@/tmsui/zodValidation";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect, useImperativeHandle } from "react";
import { DefaultValues, FieldValues, FormProvider, Path, Resolver, useForm } from "react-hook-form";
import { ZodType } from "zod";
import { FormContext } from "../useFormContext";
import { TUiFormProps } from "./form.type";


export const UiForm = <TSchema extends ZodType<FieldValues>>({
    ref,
    initialValues,
    schema,
    onSubmit,
    children,
    ...formProps
}: TUiFormProps<TSchema>) => {

    const resolver = standardSchemaResolver(
        schema as unknown as never,
    ) as unknown as Resolver<zodInfer<TSchema>, object, zodInfer<TSchema>>;

    const methods = useForm<zodInfer<TSchema>, object, zodInfer<TSchema>>({
        defaultValues: initialValues as DefaultValues<zodInfer<TSchema>>,
        resolver,
        mode: "all",
    });

    const onClear = () => {
        methods.reset(initialValues as DefaultValues<zodInfer<TSchema>>);
    };

    useEffect(() => { onClear() }, []);

    useEffect(() => { return () => { onClear() } }, []);

    useImperativeHandle(ref, () => {
        type TFormValues = zodInfer<TSchema>;

        return {
            getValues: methods.getValues,
            reset: (values?: Partial<TFormValues>) =>
                methods.reset(values as DefaultValues<TFormValues>),
            setValue: (
                name: keyof TFormValues,
                value: TFormValues[keyof TFormValues],
            ) => methods.setValue(name as Path<TFormValues>, value),
            formState: methods.formState,
            control: methods.control,
            form: methods,
            onClear: onClear,
            setError: methods.setError,
            trigger: methods.trigger,
        };
    });

    return (
        <FormContext.Provider value={{ form: methods }} >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
                    {children}
                </form>
            </FormProvider>
        </FormContext.Provider>
    );
};

UiForm.displayName = "UiForm";
