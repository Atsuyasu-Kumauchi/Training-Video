import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { TFormViewSchema } from "@/tmsui/types";

export type TStudentLoginViewSchema = TFormViewSchema<StudentLoginSchema> & {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}

export const studentLoginSchema = zodObject({
    username: zodStringRequired(),
    password: zodStringRequired(),

});


export type StudentLoginSchema = zodInfer<typeof studentLoginSchema>;

export const initialValues: StudentLoginSchema = {
    username: '',
    password: '',
};