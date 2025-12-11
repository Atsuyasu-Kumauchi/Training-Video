import { zodInfer, zodObject, zodString, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";
import { z as zod } from "zod";

export type TLoginViewSchema = TFormViewSchema<LoginSchema> & {
    step: number;
    nextStep: () => void;
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}

export const loginSchema = zodObject({
    username: zodStringRequired()
});

export const loginStep1Schema = zodObject({
    passwordType: zod.enum(["password", "otp"]),

    // MUST be optional
    password: zodString().optional(),
    otp: zodString().optional(),

}).superRefine((data, ctx) => {

    if (data.passwordType === 'password' && (!data.password || data.password.trim() === "")) {
        ctx.addIssue({
            code: "custom",
            path: ["password"],
            message: "Password is required",
        });
    }

    if (data.passwordType === 'otp' && (!data.otp || data.otp.trim() === "")) {
        ctx.addIssue({
            code: "custom",
            path: ["otp"],
            message: "OTP is required",
        });
    }
});

export const finalLoginSchema = loginSchema.and(loginStep1Schema);

export type LoginSchema = zodInfer<typeof finalLoginSchema>;

export const initialValues: LoginSchema = {
    passwordType: 'password',
    username: '',
    password: '',
    otp: '',
};