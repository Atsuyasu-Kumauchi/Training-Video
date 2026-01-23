import AdminLoginComponent from "@/components/auth/admin/login/admin.login.component";
import { getAuthToken } from "@/tmsui";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "管理者ログイン - TMS",
};

export default async function AdminLoginPage() {
    const token = await getAuthToken("tms_token");

    if (token) {
        redirect("/admin/dashboard");
    }

    return (
        <AdminLoginComponent />
    )
}
