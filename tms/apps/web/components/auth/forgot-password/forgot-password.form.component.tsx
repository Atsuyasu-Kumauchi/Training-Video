"use client";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";
import { ForgotPasswordFormSchema, forgotPasswordFormSchema, initialValues } from "./forgot-password.form.type";
import ForgotPasswordFormView from "./forgot-password.form.view";

export default function ForgotPasswordComponent() {
    const formRef = useRef<TUiFormRef<ForgotPasswordFormSchema>>(null);
    const query = useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: async (email: string) => {
            const response = await AuthServer.get("/auth/init-recovery", { params: { email: email } });
            await wait(1000);
            return response.data;
        },
        onSuccess: () => {
            formRef.current?.reset();
        },
    })

    const onSubmit: TFormHandlerSubmit<ForgotPasswordFormSchema> = (value) => {
        query.mutate((value as ForgotPasswordFormSchema).email);
    };

    const errorMessage = (query.error as AxiosError<{ message: string }>)?.response?.data?.message ?? "";
    const successMessage = query.data?.status === 200 ? true : false;

    return (
        <div className="max-w-md w-full space-y-8">
            <UiForm
                ref={formRef}
                schema={forgotPasswordFormSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <ForgotPasswordFormView
                    formRef={formRef}
                    isPending={query.isPending}
                    isError={query.isError}
                    errorMessage={errorMessage}
                    isSuccess={successMessage}
                />
            </UiForm>
        </div>
    )
}
