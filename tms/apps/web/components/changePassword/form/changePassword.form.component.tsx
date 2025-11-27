import { TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useRef } from "react";
import { changePasswordDefault, changePasswordSchema, ChangePasswordType } from "./changePassword.form.type";
import ChangePasswordFormView from "./changePassword.form.view";

export default function ChangePasswordFormComponent() {
    const formRef = useRef<TUiFormRef<ChangePasswordType>>(null)
    const onSubmit: TFormHandlerSubmit<ChangePasswordType> = (values) => {
        console.log(values)
    }
    return (
        <UiForm
            schema={changePasswordSchema}
            initialValues={changePasswordDefault}
            onSubmit={onSubmit}
            ref={formRef}
        >
            <ChangePasswordFormView />
        </UiForm>
    )
}
