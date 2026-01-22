import TagController from "@/components/tag/tag.controller";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "タグ管理 - 管理者ダッシュボード",
};

export default function TagPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagController />
    </Suspense>
  );
}
