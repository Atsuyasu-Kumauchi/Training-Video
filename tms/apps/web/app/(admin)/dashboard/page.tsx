"use client"
import dynamic from "next/dynamic";
const DashboardComponent = dynamic(() => import("@/components/dashboard/dashboard.component"), {
    ssr: false,
});

export default function Dashboard() {
    return (
        <DashboardComponent />
    )
}
