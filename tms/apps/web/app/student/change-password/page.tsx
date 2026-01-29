import { decodeJwtEdge, getAuthToken } from "@/tmsui";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const StudentChangePasswordController = dynamic(
  () =>
    import("@/components/students/changePassword/changePassword.controller"),
);
export const metadata: Metadata = {
  title: "パスワード変更 - 学生ポータル", // Change Password - Student Portal
};

export default async function ChangePasswordPage() {
  const cookie = await getAuthToken("tms_token");
  const user = await decodeJwtEdge<{ username: string }>(cookie || "");
  return <StudentChangePasswordController username={user?.username || ""} />;
}
