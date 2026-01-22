import { AUTH } from "@/common";
import { AuthServer, setAuthToken, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { changePasswordDefault, changePasswordSchema, ChangePasswordType } from "./changePassword.form.type";
import ChangePasswordFormView from "./changePassword.form.view";

export default function ChangePasswordFormComponent({ username }: { username: string }) {
    const formRef = useRef<TUiFormRef<ChangePasswordType>>(null)

    const loginMutation = useMutation({
        mutationKey: ["student-login-after-change-password"],
        mutationFn: (data: { username: string, password: string }) => {
            return AuthServer({
                method: "POST",
                url: AUTH.LOGIN,
                data,
            });
        },
        onSuccess: async (data) => {
            if (data.data?.accessToken) {
                await setAuthToken({ name: "tms_token", value: data.data.accessToken });
                await wait();
                window.location.reload();
            }
        },
    });

    const mutation = useMutation({
        mutationKey: ["student-change-password"],
        mutationFn: (data: ChangePasswordType) => {
            return AuthServer({
                method: "POST",
                url: AUTH.CHANGE_PASSWORD,
                data,
            });
        },
        onSuccess: async (_, data) => {
            await loginMutation.mutateAsync({
                username: username,
                password: data?.newpassword as string,
            });
        },
    });



    const onSubmit: TFormHandlerSubmit<ChangePasswordType> = async (values) => {
        const data = values as ChangePasswordType;
        if (!username) {
            return null;
        }

        try {
            await mutation.mutateAsync({
                password: data.password,
                newpassword: data.newpassword,
            } as ChangePasswordType);
        } catch (error) {
            return null;
        }
    }

    const isPwdPending = mutation.isPending || loginMutation.isPending;

    return (
        <UiForm
            schema={changePasswordSchema}
            initialValues={changePasswordDefault}
            onSubmit={onSubmit}
            ref={formRef}
        >
            <ChangePasswordFormView isPwdPending={isPwdPending} />
        </UiForm>
    )
}
