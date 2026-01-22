import { Metadata } from "next";
import dynamic from "next/dynamic";
const DashboardComponent = dynamic(() => import("@/components/dashboard/dashboard.component"));

export const metadata: Metadata = {
    title: "ダッシュボード - 管理者パネル",
};

export default function Dashboard() {
    return (
        <DashboardComponent />
    )
}
