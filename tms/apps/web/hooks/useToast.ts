import toast from "react-hot-toast";

export function useToast() {
    return {
        toastSuccess: (message: string) => toast.success(message, {
            style: {
                border: '1px solid #00c950',
                padding: '16px',
                color: '#FFFFFF',
                backgroundColor: '#00c950',
            },
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#00c950',
            },
        }),
        toastError: (message: string) => toast.error(message, {
            style: {
                border: '1px solid #F22E2E',
                padding: '16px',
                color: '#FFFFFF',
                backgroundColor: '#F22E2E',
            },
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#F22E2E',
            },
        }),
    }
}