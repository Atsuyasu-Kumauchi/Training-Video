import { AUTH } from "@/common";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { changePasswordDefault, changePasswordSchema, ChangePasswordType } from "./changePassword.form.type";
import ChangePasswordFormView from "./changePassword.form.view";

export default function ChangePasswordFormComponent() {
    const formRef = useRef<TUiFormRef<ChangePasswordType>>(null)
    const mutation = useMutation({
        mutationKey: ["change-password"],
        mutationFn: async (data: ChangePasswordType) => {
            const response = await AuthServer({
                method: "POST",
                url: AUTH.CHANGE_PASSWORD,
                data,
            });
            await wait();
            return response.data;
        },
        onSuccess: () => {
            formRef.current?.reset();
        },
    });

    const onSubmit: TFormHandlerSubmit<ChangePasswordType> = (values) => {
        const data = values as ChangePasswordType;
        if (data) {
            mutation.mutate({
                password: data.password,
                newpassword: data.newpassword,
            } as ChangePasswordType);
        }
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
