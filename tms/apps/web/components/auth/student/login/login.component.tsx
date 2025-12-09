"use client";
import { TFormHandlerSubmit, TUiFormRef, UiForm, zodInfer, zodObject } from '@/tmsui';
import { useRef } from 'react';
import { z } from 'zod';
import LoginView from './login.view';

const loginSchema = zodObject({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginSchema = zodInfer<typeof loginSchema>;

const initialValues: LoginSchema = {
    email: '',
    password: '',
};

export default function LoginComponent() {
    const formRef = useRef<TUiFormRef<LoginSchema>>(null);
    const onSubmit: TFormHandlerSubmit<LoginSchema> = (value) => {
        console.log("value of login form", value);
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <UiForm
                ref={formRef}
                schema={loginSchema} initialValues={initialValues} onSubmit={onSubmit}>
                <LoginView />
            </UiForm>
        </div>
    )
}
