import { UiFormInput } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { LoginFormSchema } from "./login.form.type";

export default function LoginFormView() {
    return (
        <div className="max-w-md w-full space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    管理者ログイン
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    トレーニング管理システム
                </p>
            </div>
            {/* Login Form */}
            <div className="mt-8 space-y-6 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div id="loginForm" className="space-y-6">
                    <UiFormInput<LoginFormSchema> name="adminId" label="管理者ID" placeholder="管理者ID" />
                    <UiFormInputPassword<LoginFormSchema> name="password" label="パスワード" placeholder="パスワード" />
                </div>
                {/* MFA Section */}
                <div id="mfa-section" className="hidden">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="mfa-code" className="sr-only">MFA Code</label>
                            <input id="mfa-code" name="mfa-code" type="text" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Enter 6-digit MFA code" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            ログイン状態を保持
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="forgot-password.html" className="font-medium text-primary hover:text-secondary">
                            パスワードをお忘れですか？
                        </a>
                    </div>
                </div>
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>
                        <a href="mfa-setup.html" className="text-white">ログイン</a>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center">
                <p className="text-xs text-gray-500">
                    © 2025 Training Management System. All rights reserved.
                </p>
            </div>
        </div>
    )
}
