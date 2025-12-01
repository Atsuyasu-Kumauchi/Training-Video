"use client";
import dynamic from "next/dynamic";
const TagComponent = dynamic(() => import("@/components/tag/tag.component"));
export default function TagPage() {
  return <TagComponent />;
}
