"use client";
import dynamic from "next/dynamic";
const UserGroupsComponent = dynamic(
  () => import("@/components/tag/tag.component"),
  {
    ssr: false,
  }
);
export default function UserGroupsPage() {
  return <UserGroupsComponent />;
}
