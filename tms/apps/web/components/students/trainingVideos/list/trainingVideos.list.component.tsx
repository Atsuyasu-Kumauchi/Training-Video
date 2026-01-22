"use client"
import { ITrainingVideosStatus, MY_TRAINING_LIST } from "@/common";
import { AuthServer } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TrainingVideosListColumn from "./trainingVideos.list.column";

export default function TrainingVideosListComponent() {
  const { id } = useParams<{ id: string }>()
  const { data = { data: {} }, isLoading } = useQuery({
    queryKey: ["training-videos", id],
    queryFn: () => {
      return AuthServer({
        method: "GET",
        url: MY_TRAINING_LIST.FIND_BY_ID(id)
      })
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black/50 opacity-50">
        loading...
      </div>
    )
  };
  data.data.users[0].videoProgressMap = Object.fromEntries(
    data?.data?.users[0].progress.map((v: ITrainingVideosStatus) => {
      const progressEntry = Object.entries(v)[0];
      return [progressEntry[0], progressEntry[1]];
    })
  );
  return (
    <TrainingVideosListColumn training={data?.data} />
  )
}
