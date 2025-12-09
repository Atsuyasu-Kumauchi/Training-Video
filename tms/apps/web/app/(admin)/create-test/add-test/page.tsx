import { Metadata } from "next";
import dynamic from 'next/dynamic';
const CreateTestFormComponent = dynamic(() => import('@/components/createTest/form/createTest.form.component'))
export const metadata: Metadata = {
    title: "新規テスト追加 - 管理者ダッシュボード",
};

export default function AddTestPage() {
    return (
        <CreateTestFormComponent />
    )
}
