import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";
import { zodEmailRequired } from "@/tmsui/zodValidation";

export const adminLoginSchema = zodObject({
    email: zodEmailRequired(),
    password: zodStringRequired(),
});

export type TAdminLoginSchema = zodInfer<typeof adminLoginSchema>;

export type TAdminLoginViewSchema = TFormViewSchema<TAdminLoginSchema> & {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialValues: TAdminLoginSchema = {
    email: "",
    password: "",
};