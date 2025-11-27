"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
type TanStackQueryClientProviderProps = {
    children: ReactNode;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 1000 * 60 * 60, // 1 hour
            staleTime: 1000 * 60 * 30, // 30 minutes
        },
    },
});


export default function TanStackQueryClientProvider({ children }: TanStackQueryClientProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
