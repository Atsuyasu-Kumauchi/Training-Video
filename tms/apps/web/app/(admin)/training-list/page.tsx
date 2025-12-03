
import { Metadata } from "next";
import dynamic from "next/dynamic";
const TrainingListController = dynamic(() => import("@/components/trainingList/trainingList.controller"));
export const metadata: Metadata = {
    title: "トレーニング一覧 - 管理者ダッシュボード",
};
export default function TrainingListPage() {
    return (
        <TrainingListController />
    )
}
