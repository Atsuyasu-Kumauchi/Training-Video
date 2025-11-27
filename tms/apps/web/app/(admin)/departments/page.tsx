"use client"
import dynamic from "next/dynamic";
const DepartmentsComponent = dynamic(() => import("@/components/departments/departments.component"), {
    ssr: false,
});

export default function DepartmentsPage() {
    return (
        <DepartmentsComponent />
    )
}
