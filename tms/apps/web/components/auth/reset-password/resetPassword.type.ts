import { zodEmailRequired, zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";
import z from "zod";

export type TResetPasswordViewSchema = TFormViewSchema<ResetPasswordFormSchema> & {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export const resetPasswordFormSchema = zodObject({
    email: zodEmailRequired(),
    otp: z.string().min(6, "OTPは6文字である必要があります").max(7, "OTPは6文字である必要があります"),
    sig: zodStringRequired(),
    newpassword: zodStringRequired(),
});

export type ResetPasswordFormSchema = zodInfer<typeof resetPasswordFormSchema>;

export const initialValues: ResetPasswordFormSchema = {
    email: '',
    otp: '',
    sig: '',
    newpassword: '',
};