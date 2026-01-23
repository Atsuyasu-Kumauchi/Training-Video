import { useLang } from "@/lang";
import { Messages } from "@/common";
import { Button, LinkButton, UiFormInput } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { faExclamationCircle, faGraduationCap, fas, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { StudentLoginSchema, TStudentLoginViewSchema } from "./student.login.type";


export default function StudentLoginView(props: TStudentLoginViewSchema) {
    const { auth: { login } } = useLang();
    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{login.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{login.description}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                <UiFormInput<StudentLoginSchema>
                    name="username"
                    label={login.emailLabel}
                    placeholder={login.emailPlaceholder}
                    startIcon={<FontAwesomeIcon icon={fas.faEnvelope} className="text-gray-400" />}
                />
                <UiFormInputPassword<StudentLoginSchema>
                    name="password"
                    label={login.passwordLabel}
                    placeholder={login.passwordPlaceholder}
                    startIcon={<FontAwesomeIcon icon={fas.faLock} className="text-gray-400 w-8" />}
                />
                <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center">
                        <input id="rememberMe" name="rememberMe" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                            {login.stayLoginLabel}
                        </label>
                    </div>
                    <div className="text-sm">
                        <LinkButton as={Link} variant="ghost" href="/forgot-password" >
                            {login.forgotPassword}
                        </LinkButton>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button type="submit" className="w-full" disabled={props.isPending} loading={props.isPending} >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
                        <span>{login.login}</span>
                    </Button>
                </div>
                {props.isError && (
                    <div id="loginError" className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                        <div className="flex">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-red-400 mr-2 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">{Messages.LOGIN_FAILED}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
