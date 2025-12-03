
import { Metadata } from "next";
import dynamic from "next/dynamic";
const AssignmentListController = dynamic(() => import("@/components/assignmentList/assignmentList.controller"));
export const metadata: Metadata = {
    title: "課題一覧 - 管理者ダッシュボード",
};
export default function AssignmentListPage() {
    return (
        <AssignmentListController />
    )
}