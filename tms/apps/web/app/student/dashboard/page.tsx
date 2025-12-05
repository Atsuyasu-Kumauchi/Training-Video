
import { Metadata } from "next";
import dynamic from "next/dynamic";
const StudentsDashboardComponent = dynamic(() => import("@/components/students/dashboard/dashboard.component"));
export const metadata: Metadata = {
    title: "学生ダッシュボード - トレーニングプラットフォーム",
};
export default function DashboardPage() {
    return (
        <StudentsDashboardComponent />
    )
}
