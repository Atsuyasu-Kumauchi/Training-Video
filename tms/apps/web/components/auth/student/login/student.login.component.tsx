"use client";
import { AUTH } from '@/common';
import { AuthServer, parseJwt, setAuthTokens, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
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
        onSuccess: (data) => {
            if (data?.accessToken) {
                const user = parseJwt(data.accessToken);
                if (!user?.isAdmin) {
                    setAuthTokens("tms_token", data.accessToken);
                    window.location.href = "/totp-qr";
                }

            }
        },
        onError: (error) => {
            console.log(error);
            if ((error as AxiosError).response?.status === 401) {
                formRef.current?.form?.reset()
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
                        errorMessage={mutation?.error?.message || ''}
                    />
                </UiForm>
            </div>
        </div>
    )
}
