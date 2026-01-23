import { AUTH } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, setAuthToken, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";
import { changePasswordDefault, changePasswordSchema, ChangePasswordType } from "./changePassword.form.type";
import ChangePasswordFormView from "./changePassword.form.view";

export default function ChangePasswordFormComponent({ username }: { username: string }) {
    const { toastError, toastSuccess } = useToast()
    const formRef = useRef<TUiFormRef<ChangePasswordType>>(null)
    const loginMutation = useMutation({
        mutationKey: ["admin-login-after-change-password"],
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
            toastSuccess("パスワード変更に成功しました。")
        },
    });

    const mutation = useMutation({
        mutationKey: ["admin-change-password"],
        mutationFn: async (data: ChangePasswordType) => {
            return await AuthServer({
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
        onError: (error) => {
            const errorData = (error as AxiosError<{ message: string }>)?.response?.data?.message;
            toastError(errorData || "")
        }
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
            <ChangePasswordFormView formRef={formRef} isPwdPending={isPwdPending} />
        </UiForm>
    )
}
