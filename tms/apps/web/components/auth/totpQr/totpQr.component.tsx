"use client";
import { parseJwt } from '@/proxy';
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { getAuthTokens, setAuthTokens } from '@/tmsui/core/server/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { initialValues, totpQrSchema, TotpQrSchema } from './totpQr.type';
import TotpQrView from './totpQr.view';

export default function TotpQrComponent() {
    const formRef = useRef<TUiFormRef<TotpQrSchema>>(null);
    const navigate = useRouter();
    const token = getAuthTokens();
    const user = token ? (parseJwt(token)) : "";
    const mutation = useMutation({
        mutationKey: ["totp-qr"],
        mutationFn: async (value: { username: string, password: string }) => {
            const url = "/auth/login-totp";
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
                const user = parseJwt(data.accessToken);
                if (user?.isAdmin) {
                    navigate.push("/admin/dashboard");
                } else {
                    navigate.push("/student/dashboard");
                }
            }
        },
        onError: () => {
            formRef.current?.form?.reset()
        },
    });

    const onSubmit: TFormHandlerSubmit<TotpQrSchema> = (value) => {
        if (value) {
            const formData = value as TotpQrSchema;

            mutation.mutate({
                username: user?.username,
                password: formData.password,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <UiForm ref={formRef} schema={totpQrSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    <TotpQrView
                        formRef={formRef}
                        isPending={mutation.isPending}
                        isError={mutation.isError}
                        errorMessage={mutation?.error?.message || ''}
                        isResetPwd={user?.resetPwd || false}
                    />
                </UiForm>
            </div>
        </div>
    )
}
