"use client"
import { queryClient } from "@/tmsui";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
type TanStackQueryClientProviderProps = {
    children: ReactNode;
}




export default function TanStackQueryClientProvider({ children }: TanStackQueryClientProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
