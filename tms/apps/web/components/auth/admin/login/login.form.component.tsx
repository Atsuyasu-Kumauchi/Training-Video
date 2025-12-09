"use client";
import { TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useRef } from "react";
import { initialValues, LoginFormSchema, loginFormSchema } from "./login.form.type";
import LoginFormView from "./login.form.view";

export default function LoginFormComponent() {
    const formRef = useRef<TUiFormRef<LoginFormSchema>>(null);
    const onSubmit: TFormHandlerSubmit<LoginFormSchema> = (value) => {
        console.log("value of login form", value);
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <UiForm
                ref={formRef}
                schema={loginFormSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <LoginFormView />
            </UiForm>
        </div>
    )
}
