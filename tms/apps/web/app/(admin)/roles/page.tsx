"use client";
import dynamic from "next/dynamic";
const RolesController = dynamic(() => import("@/components/roles/roles.controller"), { ssr: false });

export default function RolePage() {
  return <RolesController />;
}
