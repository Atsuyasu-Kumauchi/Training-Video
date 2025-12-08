import { Metadata } from "next";
import dynamic from "next/dynamic";
const StudentsDashboardController = dynamic(
  () => import("@/components/students/dashboard/studentDashboard.controller")
);
export const metadata: Metadata = {
  title: "学生ダッシュボード - トレーニングプラットフォーム",
};
export default function DashboardPage() {
  return <StudentsDashboardController />;
}
