"use client"
import { MY_TRAINING_LIST } from "@/common";
import { AuthServer } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TrainingVideosListColumn from "./trainingVideos.list.column";

export default function TrainingVideosListComponent() {
  const { id } = useParams<{ id: string }>()
  const { data: training } = useQuery({
    queryKey: ["training-videos", id],
    queryFn: () => {
      return AuthServer({
        method: "GET",
        url: MY_TRAINING_LIST.FIND_BY_ID(id)
      })
    }
  })
  return (
    <TrainingVideosListColumn training={training?.data} />
  )
}
