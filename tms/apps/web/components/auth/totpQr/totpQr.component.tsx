"use client";
import { AUTH } from '@/common';
import { useToast } from '@/hooks/useToast';
import { AuthServer, decodeJwtClient, setAuthToken, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { useSettings } from '@/tmsui/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { initialValues, totpQrSchema, TotpQrSchema } from './totpQr.type';
import TotpQrView from './totpQr.view';

type TTotpQrComponentProps = {
    isAdmin?: boolean;
    resetPwd?: boolean;
    username: string;
}

export default function TotpQrComponent(props: TTotpQrComponentProps) {
    const { setUser } = useSettings();
    const { resetPwd, username } = props;
    const navigate = useRouter();
    const { toastSuccess } = useToast();
    const formRef = useRef<TUiFormRef<TotpQrSchema>>(null);
    const mutation = useMutation({
        mutationKey: ["totp-qr"],
        mutationFn: async (value: { username: string, password: string }) => {
            const response = await AuthServer({
                method: "POST",
                url: AUTH.LOGIN_TOTP,
                data: value,
            });
            await wait();
            return response.data;
        },
        onSuccess: async (data) => {
            if (data?.accessToken) {
                await setAuthToken({ name: "tms_token", value: data.accessToken });
                await setAuthToken({ name: "tms_step", value: "2" });
                const user = decodeJwtClient<{ isAdmin: boolean, username: string, }>(data.accessToken || "");
                setUser({
                    username: user?.username || "",
                });
                if (user?.isAdmin) {
                    navigate.push("/admin/dashboard");
                    toastSuccess("ログインに成功しました");
                } else {
                    navigate.push("/dashboard");
                    toastSuccess("ログインに成功しました");
                }
            }
        },
        onError: () => {
            formRef.current?.form?.reset()
        },
    });

    const onSubmit: TFormHandlerSubmit<TotpQrSchema> = async (value) => {
        if (value) {
            const formData = value as TotpQrSchema;
            mutation.mutate({
                username: username,
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
                        errorMessage={(mutation.error as AxiosError<{ message: string }>)?.response?.data?.message || ''}
                        isResetPwd={resetPwd || false}
                    />
                </UiForm>
            </div>
        </div>
    )
}
