import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const userSchema = zodObject({
    name: zodStringRequired(),
});

export type TUserSchema = zodInfer<typeof userSchema>;

export const initialValues: TUserSchema = {
    name: "",
};