"use client";
import dynamic from "next/dynamic";
const RolesComponent = dynamic(
  () => import("@/components/roles/roles.component"),
  {
    ssr: false,
  }
);

export default function RolePage() {
  return <RolesComponent />;
}
