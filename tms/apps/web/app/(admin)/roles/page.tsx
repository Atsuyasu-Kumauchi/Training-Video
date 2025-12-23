import { Metadata } from "next";
import dynamic from "next/dynamic";
const RolesController = dynamic(() => import("@/components/roles/roles.controller"));
export const metadata: Metadata = {
  title: "役割 - 管理者ダッシュボード",
};

export default function RolePage() {
  return <RolesController />;
}
