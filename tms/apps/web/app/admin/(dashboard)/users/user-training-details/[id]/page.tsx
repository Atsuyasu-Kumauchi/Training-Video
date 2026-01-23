import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const UserTrainingDetailsComponent = dynamic(
  () =>
    import("@/components/userList/user-training-details/user.training.details.component"),
);
export const metadata: Metadata = {
  title: "ユーザートレーニング詳細 - 管理者ダッシュボード", /// User Training Details - Admin Dashboard
};

export default function UserTrainingDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserTrainingDetailsComponent />
    </Suspense>
  );
}
