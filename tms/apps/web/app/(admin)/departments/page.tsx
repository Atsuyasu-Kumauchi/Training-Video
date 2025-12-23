import { Metadata } from "next";
import dynamic from "next/dynamic";
const DepartmentsController = dynamic(() => import("@/components/departments/departments.controller"));
export const metadata: Metadata = {
    title: "部門 - 管理者ダッシュボード",
};

export default function DepartmentsPage() {
    return (
        <DepartmentsController />
    )
}
