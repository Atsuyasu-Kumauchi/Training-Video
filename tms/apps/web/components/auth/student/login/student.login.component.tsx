"use client";
import { AUTH, Messages } from '@/common';
import { AuthServer, decodeJwtClient, setAuthToken, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { initialValues, StudentLoginSchema, studentLoginSchema } from './student.login.type';
import StudentLoginView from './student.login.view';



export default function StudentLoginComponent() {
    const formRef = useRef<TUiFormRef<StudentLoginSchema>>(null);
    const navigate = useRouter();
    const mutation = useMutation({
        mutationKey: ["student-login"],
        mutationFn: async (value: StudentLoginSchema) => {
            const response = await AuthServer({
                method: "POST",
                url: AUTH.LOGIN,
                data: value,
            });
            await wait();
            return response.data;
        },
        onSuccess: async (data) => {
            if (data?.accessToken) {
                const user = decodeJwtClient<{ isAdmin: boolean }>(data.accessToken || "");
                if (user?.isAdmin === false) {
                    await setAuthToken({ name: "tms_token", value: data.accessToken });
                    await setAuthToken({ name: "tms_step", value: "1" });
                    window.location.href = "/totp-qr";
                } else {
                    throw new Error("User is not a student");
                }
            }
        },
        onError: (error) => {
            if ((error as AxiosError).response?.status === 401) {
                // Don't reset form on error - keep the entered values so user can see what they typed
                // Only navigate away if it's a 401 unauthorized error
                navigate.push("/");
            }
        }
    });

    const onSubmit: TFormHandlerSubmit<StudentLoginSchema> = (value) => {
        if (value) {
            mutation.mutate(value as StudentLoginSchema);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <UiForm
                    ref={formRef}
                    schema={studentLoginSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    <StudentLoginView
                        formRef={formRef}
                        isPending={mutation.isPending}
                        isError={mutation.isError}
                        errorMessage={mutation.isError ? Messages.LOGIN_FAILED : ''}
                    />
                </UiForm>
            </div>
        </div>
    )
}
