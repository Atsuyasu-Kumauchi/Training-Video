"use client";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { setAuthTokens } from '@/tmsui/core/server/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Path } from 'react-hook-form';
import { finalLoginSchema, initialValues, LoginSchema, loginSchema, loginStep1Schema } from './login.type';
import LoginView from './login.view';



export default function LoginComponent() {
    const [step, setStep] = useState(1);
    const formRef = useRef<TUiFormRef<LoginSchema>>(null);

    const nextStep = async () => {
        const currentSchema = step === 1 ? loginSchema : loginStep1Schema;
        const fields = Object.keys(currentSchema.shape);
        const isValid = await formRef.current?.form.trigger(fields as Path<LoginSchema>[]);
        if (isValid) setStep(step + 1);
    };

    const mutation = useMutation({
        mutationFn: async (value: LoginSchema) => {
            const body = {
                username: value.username,
                password: value.passwordType === "password" ? value.password : value.otp,
            }
            const url = value.passwordType === "password" ? "/login" : "/login-totp";
            const response = await AuthServer.post(url, body);
            await wait();
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.accessToken) {
                setAuthTokens("accessToken", data.accessToken);
                window.location.reload();
            }
        }
    });

    const onSubmit: TFormHandlerSubmit<LoginSchema> = (value) => {
        if (value && typeof value === 'object' && 'username' in value) {
            const formData = value as LoginSchema;
            mutation.mutate(formData as LoginSchema);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <UiForm
                    ref={formRef}
                    schema={finalLoginSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    <LoginView
                        formRef={formRef}
                        step={step}
                        nextStep={nextStep}
                        isPending={mutation.isPending}
                        isError={mutation.isError}
                        errorMessage={mutation?.error?.message || ''}
                    />
                </UiForm>
            </div>
        </div>
    )
}
