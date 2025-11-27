"use client";
import dynamic from "next/dynamic";
const UserGroupsComponent = dynamic(
  () => import("@/components/userGroups/userGroups.component"),
  {
    ssr: false,
  }
);
export default function UserGroupsPage() {
  return <UserGroupsComponent />;
}
