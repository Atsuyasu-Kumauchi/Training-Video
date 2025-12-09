import { Metadata } from "next";
import dynamic from "next/dynamic";
const ChangePasswordController = dynamic(() => import("@/components/changePassword/changePassword.controller"));

export const metadata: Metadata = {
    title: "パスワード変更 - 管理者ダッシュボード",
};

export default function ChangePasswordPage() {
    return (
        <ChangePasswordController />
    )
}
