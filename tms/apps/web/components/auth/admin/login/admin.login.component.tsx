"use client"
import { AUTH, Messages } from '@/common';
import { AuthServer, decodeJwtClient, setAuthToken, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { adminLoginSchema, initialValues, TAdminLoginSchema } from './admin.login.type';
import AdminLoginView from './admin.login.view';

export default function AdminLoginComponent() {
    const formRef = useRef<TUiFormRef<TAdminLoginSchema>>(null);
    const mutation = useMutation({
        mutationKey: ["admin-login"],
        mutationFn: async (value: TAdminLoginSchema) => {
            const response = await AuthServer({
                method: "POST",
                url: AUTH.LOGIN,
                data: {
                    username: value.email, // Map email to username for API compatibility
                    password: value.password,
                },
            });
            await wait();
            return response.data;
        },
        onSuccess: async (data) => {
            if (data?.accessToken) {
                const user = decodeJwtClient<{ isAdmin: boolean }>(data.accessToken || "");
                if (user?.isAdmin) {
                    await setAuthToken({ name: "tms_token", value: data.accessToken });
                    await setAuthToken({ name: "tms_step", value: "1" });
                    window.location.href = "/totp-qr";
                }
            }
        },
        onError: () => {
            // Don't reset form on error - keep the entered values so user can see what they typed
        }
    });


    const onSubmit: TFormHandlerSubmit<TAdminLoginSchema> = (value) => {
        if (value) {
            mutation.mutate(value as TAdminLoginSchema);
        }
    }
    // Use constant message instead of API error message to ensure Japanese only
    const errorMessage = mutation.isError ? Messages.LOGIN_FAILED : "";
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <UiForm
                    ref={formRef}
                    schema={adminLoginSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <AdminLoginView
                        formRef={formRef}
                        isPending={mutation.isPending}
                        isError={mutation.isError}
                        errorMessage={errorMessage}
                    />
                </UiForm>
            </div>
        </div>
    )
}
