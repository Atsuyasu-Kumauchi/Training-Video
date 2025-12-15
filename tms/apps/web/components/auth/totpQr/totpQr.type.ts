import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";


export type TTotpQrViewSchema = TFormViewSchema<TotpQrSchema> & {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    isResetPwd: boolean;
}

export const totpQrSchema = zodObject({
    password: zodStringRequired()
});

export type TotpQrSchema = zodInfer<typeof totpQrSchema>;

export const initialValues: TotpQrSchema = {
    password: '',
};