import useLang from "@/lang";
import { AuthServer, Button, cn, UiFormInput } from "@/tmsui";
import { faGraduationCap, fas, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TotpQrSchema, TTotpQrViewSchema } from "./totpQr.type";

export default function TotpQrView(props: TTotpQrViewSchema) {
    const { isPending, isResetPwd } = props;
    const { auth: { login } } = useLang();

    // Only fetch the QR if isResetPwd is true
    const { data: qrCode, isFetching } = useQuery({
        queryKey: ["totp-qr-query"],
        queryFn: async () => {
            const response = await AuthServer({
                method: "GET",
                url: "/auth/totp-qr",
            });
            return response.data;
        },
        enabled: !!isResetPwd,
    });

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
                <div className={cn("flex justify-center")}>
                    {!isResetPwd ? (
                        // Skeleton if isResetPwd is false
                        <div className="" />
                    ) : isFetching ? (
                        <div className="" />
                    ) : (
                        <Image src={qrCode as string} alt="totp-qr" width={250} height={250} loading="lazy" />
                    )}
                </div>
                <UiFormInput<TotpQrSchema>
                    name="password"
                    label={login.otpLabel}
                    placeholder={login.otpPlaceholder}
                    startIcon={<FontAwesomeIcon icon={fas.faLock} className="text-gray-400 w-8" />}
                />
                <div className="flex gap-2 mt-4">
                    <Button type="submit" className="w-full" disabled={isPending} loading={isPending} >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
                        <span>{login.submit}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
