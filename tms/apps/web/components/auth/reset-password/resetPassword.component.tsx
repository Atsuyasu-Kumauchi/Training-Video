"use client";
import { AUTH } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { initialValues, ResetPasswordFormSchema, resetPasswordFormSchema } from "./resetPassword.type";
import ResetPasswordView from "./resetPassword.view";
export default function ResetPasswordComponent() {
    const { toastSuccess, toastError } = useToast();
    const navigation = useRouter();
    const searchParams = useSearchParams();
    const sig = searchParams.get("sig");
    const email = searchParams.get("email");
    const formRef = useRef<TUiFormRef<ResetPasswordFormSchema>>(null);

    const resetPasswordMutation = useMutation({
        mutationKey: ["reset-password"],
        mutationFn: async (value: ResetPasswordFormSchema) => {
            const response = await AuthServer({
                method: "POST",
                url: AUTH.RESET_PASSWORD,
                data: value,
            });
            await wait(1000);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess("Password reset has been successfully");
            formRef.current?.reset();
            navigation.push("/");
        },
        onError: (error) => {
            toastError((error as AxiosError<{ message: string }>)?.response?.data?.message ?? "Something went wrong");
        }
    })

    const onSubmit: TFormHandlerSubmit<ResetPasswordFormSchema> = (value) => {
        resetPasswordMutation.mutate(value);
    };
    const errorMessage = (resetPasswordMutation.error as AxiosError<{ message: string }>)?.response?.data?.message ?? "";
    const successMessage = resetPasswordMutation.data?.status === 200 ? true : false;

    return (
        <div className="max-w-md w-full space-y-8">
            <UiForm
                ref={formRef}
                schema={resetPasswordFormSchema}
                initialValues={{ ...initialValues, email: email || "", sig: sig || "" }}
                onSubmit={onSubmit}
            >
                <ResetPasswordView
                    formRef={formRef}
                    isPending={resetPasswordMutation.isPending}
                    isError={resetPasswordMutation.isError}
                    errorMessage={errorMessage}
                    isSuccess={successMessage}
                />
            </UiForm>
        </div>
    )
}
