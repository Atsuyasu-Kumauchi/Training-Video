"use client";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { setAuthTokens } from '@/tmsui/core/server/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { initialValues, StudentLoginSchema, studentLoginSchema } from './student.login.type';
import StudentLoginView from './student.login.view';



export default function StudentLoginComponent() {
    const formRef = useRef<TUiFormRef<StudentLoginSchema>>(null);
    const mutation = useMutation({
        mutationKey: ["student-login"],
        mutationFn: async (value: StudentLoginSchema) => {
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
        onError: (error) => {
            console.log(error);
            formRef.current?.form?.reset()
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
