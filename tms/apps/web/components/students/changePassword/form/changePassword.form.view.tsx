import useStudentLang from "@/lang/students";
import { Button } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangePasswordType,
  getPasswordStrength,
} from "./changePassword.form.type";

export default function ChangePasswordFormView({ isPwdPending }: { isPwdPending: boolean }) {
  const { changePassword } = useStudentLang();
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {changePassword.header.title}
          </h1>
        </div>
        {/* Change Password Form */}
        <div className="max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {changePassword.form.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {changePassword.form.sub_title}
              </p>
            </div>

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
                  getPasswordStrength={getPasswordStrength}
                />
              </div>
              <UiFormInputPassword<ChangePasswordType>
                name="confirmPassword"
                label={changePassword.form.confirmPassword}
                placeholder={changePassword.form.confirmPasswordPlaceholder}
              />
              <div className="mt-2">
                <div id="passwordMatch" className="text-xs text-gray-400">
                  <FontAwesomeIcon icon={faCircle} className=" text-sm" />
                  {changePassword.form.message}
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="  text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50  transition-colors duration-200"
                >
                  {changePassword.form.cancel}
                </Button>
                <Button type="submit">
                  {changePassword.form.changePassword}
                </Button>
              </div> */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isPwdPending}
                  loading={isPwdPending}
                  startIcon="key"
                  className="w-full"
                >
                  {changePassword.form.changePassword}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
