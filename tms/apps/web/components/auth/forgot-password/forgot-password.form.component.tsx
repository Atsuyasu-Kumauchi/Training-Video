"use client";
import { AUTH } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ForgotPasswordFormSchema, forgotPasswordFormSchema, initialValues } from "./forgot-password.form.type";
import ForgotPasswordFormView from "./forgot-password.form.view";

export default function ForgotPasswordComponent() {
    const { toastError, toastSuccess } = useToast();
    const formRef = useRef<TUiFormRef<ForgotPasswordFormSchema>>(null);
    const [resetEmail, setResetEmail] = useState<string>("");
    const navigate = useRouter();
    const query = useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: async (email: string) => {
            const response = await AuthServer({
                method: "GET",
                url: AUTH.INIT_RECOVERY,
                params: { email: email },
            });
            await wait(1000);
            return response.data;
        },
        onSuccess: (data) => {
            toastSuccess("Password reset link sent successfully");
            navigate.push(`/reset-password?sig=${data?.key}&email=${resetEmail}`);
        },
        onError: (error) => {
            toastError((error as AxiosError<{ message: string }>)?.response?.data?.message ?? "Something went wrong");
        },
        onSettled: () => {
            formRef.current?.reset();
        }
    })

    const onSubmit: TFormHandlerSubmit<ForgotPasswordFormSchema> = (value) => {
        setResetEmail((value as ForgotPasswordFormSchema).email);
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
