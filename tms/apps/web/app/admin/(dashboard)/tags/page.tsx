import TagController from "@/components/tag/tag.controller";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タグ管理 - 管理者ダッシュボード",
};

export default function TagPage() {
  return <TagController />;
}
