
import { useLang } from "@/lang";
import { Button, UiFormInput } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { faEnvelope, faGraduationCap, faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ResetPasswordFormSchema, TResetPasswordViewSchema } from "./resetPassword.type";

export default function ResetPasswordView(props: TResetPasswordViewSchema) {
    const { isPending, isError, errorMessage, isSuccess } = props;
    const { auth: { forgotPassword } } = useLang();
    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">パスワードをリセットする</h2>
                {/* <p className="mt-2 text-sm text-gray-600">メールアドレスを入力してリセット手順を受け取る</p> */}
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 gap-4">
                    <UiFormInput<ResetPasswordFormSchema>
                        type="email"
                        name="email"
                        label={forgotPassword.emailLabel}
                        placeholder={forgotPassword.emailPlaceholder}
                        startIcon={<FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />}

                    />
                    <UiFormInput<ResetPasswordFormSchema>
                        type="number"
                        name="otp"
                        label={'OTP'}
                        placeholder={'OTP'}
                        startIcon={<FontAwesomeIcon icon={faKey} className="text-gray-400" />}

                    />
                    <UiFormInputPassword<ResetPasswordFormSchema>
                        name="newpassword"
                        label={'New Password'}
                        placeholder={'New Password'}
                        startIcon={<FontAwesomeIcon icon={faLock} className="text-gray-400" />}

                    />
                </div>
                {/* Submit Button */}
                <div className="mt-4">
                    <Button type="submit" id="submitBtn" startIcon="paperPlane" size="md" className="w-full" loading={isPending}>
                        {forgotPassword.sendResetLink}
                    </Button>
                </div>
                {/* Error Message */}
                {isError && <div id="formError" className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                    <div className="flex">
                        <i className="fas fa-exclamation-circle text-red-400 mr-2 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p id="errorMessage" className="text-sm text-red-700 mt-1">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>}
                {/* Success Message */}
                {isSuccess && <div id="successMessage" className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <div className="flex">
                        <i className="fas fa-check-circle text-green-400 mr-2 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-green-800">Reset Link Sent</h3>
                            <p className="text-sm text-green-700 mt-1">
                                We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                    <Link href="/" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                        {forgotPassword.login}
                    </Link>
                </p>
            </div>
        </div>
    )
}
