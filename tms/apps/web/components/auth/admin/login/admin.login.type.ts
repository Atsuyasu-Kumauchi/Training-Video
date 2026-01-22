import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";


export type TAdminLoginViewSchema = TFormViewSchema<TAdminLoginSchema> & {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}


export const adminLoginSchema = zodObject({
    username: zodStringRequired(),
    password: zodStringRequired(),
});

export type TAdminLoginSchema = zodInfer<typeof adminLoginSchema>;

export const initialValues: TAdminLoginSchema = {
    username: "",
    password: "",
};