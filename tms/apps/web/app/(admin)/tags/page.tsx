import { Metadata } from "next";
import dynamic from "next/dynamic";
const TagComponent = dynamic(() => import("@/components/tag/tag.component"));

export const metadata: Metadata = {
  title: "タグ管理 - 管理者ダッシュボード",
};

export default function TagPage() {
  return <TagComponent />;
}
