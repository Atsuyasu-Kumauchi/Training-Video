import { Metadata } from "next";
import dynamic from "next/dynamic";
const ResultsController = dynamic(
  () => import("@/components/students/results/results.controller"),
);
export const metadata: Metadata = {
  title: "結果 - 学生ポータル", //Results - Student Portal
};

export default function ResultsPage() {
  return <ResultsController />;
}
