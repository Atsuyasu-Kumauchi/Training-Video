import { AuthServer, TUiFormRef } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { RefObject } from "react";
import { FieldValues } from "react-hook-form";

type TMutationActionProps<TData> = {
    url: string;
    formRef: RefObject<TUiFormRef<FieldValues>>;
}

export function useMutationAction<TData extends FieldValues>({ url, formRef }: TMutationActionProps<TData>) {
    return useMutation({
        mutationKey: ["mutation-action"],
        mutationFn: (data: TData) => {
            return AuthServer({
                method: "POST",
                url,
                data,
            });
        },
        onSuccess: () => {
            formRef.current?.reset();
        },
    })
}