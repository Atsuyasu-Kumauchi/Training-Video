import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const RolesController = dynamic(() => import("@/components/roles/roles.controller"));
export const metadata: Metadata = {
  title: "役割 - 管理者ダッシュボード",
};

export default function RolePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RolesController />
    </Suspense>
  );
}
