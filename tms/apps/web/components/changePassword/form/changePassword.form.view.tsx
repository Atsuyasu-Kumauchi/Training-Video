import { Button } from "@/tmsui"
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword"
import { ChangePasswordType, getPasswordStrength } from "./changePassword.form.type"

export default function ChangePasswordFormView() {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
            </div>
            {/* Change Password Form */}
            <div className="bg-white shadow rounded-lg">
                <div id="changePasswordForm" className="p-6 space-y-6">
                    {/* Current Password */}
                    <UiFormInputPassword<ChangePasswordType>
                        name="oldPassword"
                        label="Current Password"
                        placeholder="Enter your current password"
                    />
                    {/* New Password with Strength Meter */}
                    <div>
                        <UiFormInputPassword<ChangePasswordType>
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter your new password"
                            getPasswordStrength={getPasswordStrength}
                        />
                    </div>
                    <UiFormInputPassword<ChangePasswordType>
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Enter your confirm password"
                    />


                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="outline" className="  text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50  transition-colors duration-200">
                            Cancel
                        </Button>
                        <Button type="submit">
                            Update Password
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}

