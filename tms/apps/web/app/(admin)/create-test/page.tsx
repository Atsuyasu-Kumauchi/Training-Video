import { Metadata } from "next";
import dynamic from "next/dynamic";
const CreateTestController = dynamic(() => import("@/components/createTest/createTest.controller"));

export const metadata: Metadata = {
    title: "テスト作成 - 管理者ダッシュボード",
};

export default function CreateTestPage() {
    return (
        <CreateTestController />
    )
}
