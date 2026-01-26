import useLang from "@/lang";
import { Button, TUiFormRef } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { RefObject } from "react";
import { ChangePasswordType } from "./changePassword.form.type";

interface IChangePasswordFormView {
    formRef?: RefObject<TUiFormRef<ChangePasswordType> | null>;
    isPwdPending: boolean;
}

export default function ChangePasswordFormView({ formRef, isPwdPending }: IChangePasswordFormView) {
    const { changePassword } = useLang();
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{changePassword.header.title}</h1>
            </div>
            {/* Change Password Form */}
            <div className="bg-white shadow rounded-lg">
                <div id="changePasswordForm" className="p-6 space-y-6">
                    {/* Current Password */}
                    <UiFormInputPassword<ChangePasswordType>
                        name="password"
                        label={changePassword.form.currentPassword}
                        placeholder={changePassword.form.currentPasswordPlaceholder}
                    />
                    {/* New Password with Strength Meter */}
                    <div>
                        <UiFormInputPassword<ChangePasswordType>
                            name="newpassword"
                            label={changePassword.form.newPassword}
                            placeholder={changePassword.form.newPasswordPlaceholder}
                        />
                    </div>
                    <UiFormInputPassword<ChangePasswordType>
                        name="confirmPassword"
                        label={changePassword.form.confirmPassword}
                        placeholder={changePassword.form.confirmPasswordPlaceholder}
                    />


                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" onClick={() => formRef?.current?.reset()} variant="outline" className="  text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50  transition-colors duration-200">
                            {changePassword.form.cancel}
                        </Button>
                        <Button type="submit" disabled={isPwdPending} loading={isPwdPending}>
                            {changePassword.form.updatePassword}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

