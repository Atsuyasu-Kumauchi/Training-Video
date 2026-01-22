
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const UserController = dynamic(() => import("@/components/userList/user.controller"));
export const metadata: Metadata = {
    title: "ユーザー - 管理者ダッシュボード",
};

export default function UserPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserController />
        </Suspense>
    )
}
