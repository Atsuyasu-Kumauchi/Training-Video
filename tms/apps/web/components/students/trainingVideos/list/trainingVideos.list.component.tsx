"use client"
import { ITrainingVideosStatus, MY_TRAINING_LIST } from "@/common";
import { AuthServer, wait } from "@/tmsui";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TrainingVideosListColumn from "./trainingVideos.list.column";

export default function TrainingVideosListComponent() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ["training-videos", id],
    queryFn: async () => {
      const response = await AuthServer({
        method: "GET",
        url: MY_TRAINING_LIST.FIND_BY_ID(id)
      })
      await wait();
      return response.data;
    }
  })

  console.log("data", data);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white/50 opacity-50">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      </div>
    )
  };

  data.users[0].videoProgressMap = Object.fromEntries(
    data?.users[0].progress.map((v: ITrainingVideosStatus) => {
      const progressEntry = Object.entries(v)[0];
      return [progressEntry[0], progressEntry[1]];
    })
  );


  return (
    <TrainingVideosListColumn training={data} />
  )
}
