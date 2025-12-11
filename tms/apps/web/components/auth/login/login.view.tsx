import { useLang } from "@/lang";
import { Button, cn, LinkButton, UiFormInput, useFormContext } from "@/tmsui";
import { UiFormInputPassword } from "@/tmsui/ui/UiFormInputPassword";
import { UiFormRadio } from "@/tmsui/ui/UiFormRadio";
import { faCircleNotch, faExclamationCircle, faGraduationCap, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { LoginSchema, TLoginViewSchema } from "./login.type";


export default function LoginView(props: TLoginViewSchema) {
    const { watch } = useFormContext<LoginSchema>()
    const { step, nextStep } = props;
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* {step} */}
                {step === 1 && (
                    <UiFormInput<LoginSchema> name="username" label={login.emailLabel} placeholder={login.emailPlaceholder} />
                )}
                {step === 2 && (<>
                    <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-4">
                        <label className={cn(
                            "px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150",
                            watch("passwordType") === "password" ? "bg-white shadow text-black font-medium" : "text-gray-800"
                        )}>
                            <UiFormRadio<LoginSchema>
                                name="passwordType"
                                value="password"
                                className="sr-only"
                            />
                            {login.passwordLabel}
                        </label>
                        <label className={cn("px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150",
                            watch("passwordType") === "otp" ? "bg-white shadow text-black font-medium" : "text-gray-800"
                        )}>
                            <UiFormRadio<LoginSchema>
                                name="passwordType"
                                value="otp"
                                className="sr-only"
                            />
                            {login.otpLabel}
                        </label>
                    </div>
                    <div className={cn(watch("passwordType") !== "password" && "hidden")} >
                        <UiFormInputPassword<LoginSchema> name="password" label={login.passwordLabel} placeholder={login.passwordPlaceholder} />
                    </div>
                    <div className={cn(watch("passwordType") !== "otp" && "hidden")} >
                        <UiFormInput<LoginSchema> name="otp" label={login.otpLabel} placeholder={login.otpPlaceholder} />
                    </div>
                </>)}
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
                    {step < 2 && <Button type="button" onClick={nextStep} className="w-full" >{login.continue}</Button>}
                    {step === 2 &&
                        <Button type="submit" className="w-full" disabled={props.isPending} >
                            {props.isPending ?
                                <FontAwesomeIcon icon={faCircleNotch} className="mr-2 animate-spin text-lg" />
                                :
                                (
                                    <>
                                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
                                        <span>{login.login}</span>
                                    </>
                                )}
                        </Button>
                    }
                </div>
                {props.isError && (
                    <div id="loginError" className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                        <div className="flex">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-red-400 mr-2 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-medium text-red-800">ログイン失敗</h3>
                                <p id="errorMessage" className="text-sm text-red-700 mt-1" >{props.errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
