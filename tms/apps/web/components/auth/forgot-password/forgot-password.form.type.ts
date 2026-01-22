import { zodEmailRequired, zodInfer, zodObject } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";

export type TForgotPasswordViewSchema = TFormViewSchema<ForgotPasswordFormSchema> & {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export const forgotPasswordFormSchema = zodObject({
    email: zodEmailRequired(),
});

export type ForgotPasswordFormSchema = zodInfer<typeof forgotPasswordFormSchema>;

export const initialValues: ForgotPasswordFormSchema = {
    email: '',
};