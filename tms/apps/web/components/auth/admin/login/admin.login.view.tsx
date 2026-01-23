import { Button, cn, LinkButton, useFormContext } from "@/tmsui";
import { Messages } from "@/common";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { TAdminLoginSchema, TAdminLoginViewSchema } from "./admin.login.type";

export default function AdminLoginView(props: TAdminLoginViewSchema) {
    const { formRef, isPending, isError, errorMessage } = props;
    const { control, formState: { errors } } = useFormContext<TAdminLoginSchema>();
    return (
        <>
            {/* Logo and Header */}
            <div className="text-center">
                
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    管理者ログイン
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    トレーニング管理システム
                </p>
            </div>
            {/* Login Form */}
            <div className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="admin-email" className="sr-only">Email</label>
                                <input
                                    id="admin-email"
                                    type="email"
                                    className={cn(
                                        "appearance-none rounded-none relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm",
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    )}
                                    placeholder="メールアドレス"
                                    {...field}
                                />
                            </div>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    className={cn(
                                        "appearance-none rounded-none relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm",
                                        errors.password ? "border-red-500" : "border-gray-300"
                                    )}
                                    placeholder="パスワード"
                                    {...field}
                                />
                            </div>
                        )}
                    />
                </div>


                {/* MFA Section */}
                {/* <div id="mfa-section">
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="mfa-code" className="sr-only">MFA Code</label>
                            <input id="mfa-code" name="mfa-code" type="text" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Enter 6-digit MFA code" />
                        </div>
                    </div>
                </div> */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            ログイン状態を保持
                        </label>
                    </div>
                    <div className="text-sm">
                        <LinkButton as={Link} href="/forgot-password" variant="ghost" color="primary" >
                            パスワードをお忘れですか？
                        </LinkButton>
                    </div>
                </div>
                <div>
                    <Button type="submit" className="w-full" startIcon="login" disabled={isPending} loading={isPending} >
                        <span>ログイン</span>
                    </Button>
                </div>
            </div>
            {/* Error Message */}
            {errorMessage && <div id="error-message" className="bg-red-50 border border-red-200 rounded-md mt-4 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            {Messages.LOGIN_FAILED}
                        </h3>
                    </div>
                </div>
            </div>}
            {/* Footer */}
            <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Training Management System. All rights reserved.
                </p>
            </div>
        </>

    )
}
