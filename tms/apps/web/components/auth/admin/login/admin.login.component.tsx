"use client"
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { setAuthTokens } from '@/tmsui/core/server/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { adminLoginSchema, initialValues, TAdminLoginSchema } from './admin.login.type';
import AdminLoginView from './admin.login.view';

export default function AdminLoginComponent() {
    const formRef = useRef<TUiFormRef<TAdminLoginSchema>>(null);

    const mutation = useMutation({
        mutationKey: ["admin-login"],
        mutationFn: async (value: TAdminLoginSchema) => {
            const url = "/auth/login";
            const response = await AuthServer({
                method: "POST",
                url,
                data: value,
            });
            await wait();
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.accessToken) {
                setAuthTokens("tms_token", data.accessToken);
                window.location.href = "/totp-qr";
            }
        },
        onError: () => {
            formRef.current?.form?.reset()
        }
    });


    const onSubmit: TFormHandlerSubmit<TAdminLoginSchema> = (value) => {
        if (value) {
            mutation.mutate(value as TAdminLoginSchema);
        }
    }

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
                        errorMessage={mutation?.error?.message || ''}
                    />
                </UiForm>
            </div>
        </div>
    )
}
