import { zodInfer, zodObject } from "@/tmsui";
import { z } from "zod";

export const loginFormSchema = zodObject({
    adminId: z.string().min(1),
    password: z.string().min(8),
});

export type LoginFormSchema = zodInfer<typeof loginFormSchema>;

export const initialValues: LoginFormSchema = {
    adminId: '',
    password: '',
};