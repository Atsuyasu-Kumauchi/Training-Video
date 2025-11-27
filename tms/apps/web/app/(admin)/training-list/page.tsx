"use client"
import dynamic from "next/dynamic";
const TrainingListComponent = dynamic(() => import("@/components/trainingList/trainingList.component"), {
    ssr: false,
});

export default function TrainingListPage() {
    return (
         <TrainingListComponent />
    )
}
