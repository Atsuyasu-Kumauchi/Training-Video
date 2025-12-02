"use client"
import dynamic from "next/dynamic";
const AssignmentListController = dynamic(() => import("@/components/assignmentList/assignmentList.controller"));

export default function AssignmentListPage() {
    return (
        <AssignmentListController />
    )
}