import { AdminLayout } from "@/tmsui";

type IAdminLayout = {
    children: React.ReactNode
}

export default function layout({ children }: IAdminLayout) {
    return (<AdminLayout>{children}</AdminLayout>)
}
