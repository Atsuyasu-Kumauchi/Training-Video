import { UiFormInput } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { faExclamationCircle, faGraduationCap, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginSchema } from "./login.component";
export default function LoginView() {
    return (
        <div className="max-w-md w-full space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">おかえりなさい</h2>
                <p className="mt-2 text-sm text-gray-600">トレーニングポータルアカウントにログイン</p>
            </div>
            {/* Login Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div id="loginForm" className="space-y-6">
                    <UiFormInput<LoginSchema> name="email" label="メールアドレス" placeholder="メールアドレスを入力" />
                    <UiFormInputPassword<LoginSchema> name="password" label="パスワード" placeholder="パスワードを入力" />
                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="rememberMe" name="rememberMe" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                ログイン状態を保持
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="forgot-password.html" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200">
                                パスワードをお忘れですか？
                            </a>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button type="submit" id="loginBtn" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                            ログイン
                        </button>
                    </div>
                    {/* Error Message */}
                    <div id="loginError" className="hidden bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-red-400 mr-2 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">ログイン失敗</h3>
                                <p id="errorMessage" className="text-sm text-red-700 mt-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
