import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const DepartmentsController = dynamic(() => import("@/components/departments/departments.controller"));
export const metadata: Metadata = {
    title: "部門 - 管理者ダッシュボード",
};

export default function DepartmentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DepartmentsController />
        </Suspense>
    )
}
