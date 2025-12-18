import { decodeJwtEdge, getAuthToken } from "@/tmsui";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const ChangePasswordController = dynamic(() => import("@/components/changePassword/changePassword.controller"));

export const metadata: Metadata = {
    title: "パスワード変更 - 管理者ダッシュボード",
};

export default async function ChangePasswordPage() {
    const cookie = await getAuthToken("tms_token");
    const user = await decodeJwtEdge<{ username: string }>(cookie || "");
    return (
        <ChangePasswordController username={user?.username || ""} />
    )
}
