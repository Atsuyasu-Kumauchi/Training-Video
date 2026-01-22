import { AdminLayout } from "@/tmsui";
import { RequireAuth } from "@/common/components/RequireAuth";

type IAdminLayout = {
    children: React.ReactNode
}

export default function layout({ children }: IAdminLayout) {
    return (
        <RequireAuth>
            <AdminLayout>{children}</AdminLayout>
        </RequireAuth>
    )
}
