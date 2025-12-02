"use client"
import dynamic from "next/dynamic";
const DepartmentsController = dynamic(() => import("@/components/departments/departments.controller"), {
    ssr: false,
});

export default function DepartmentsPage() {
    return (
        <DepartmentsController />
    )
}
