"use client"
import dynamic from "next/dynamic";
const TrainingListController = dynamic(() => import("@/components/trainingList/trainingList.controller"));

export default function TrainingListPage() {
    return (
        <TrainingListController />
    )
}
