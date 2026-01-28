import { IMyTrainingsDto, ListQueryConfig } from "@/common";
import { useFetchListQuery } from "@/hooks";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyTrainingListView from "./myTraining.list.view";

export default function MyTrainingListComponent() {

  const { data, isLoading, isFetching } = useFetchListQuery<IMyTrainingsDto>({
    pageIndex: 0,
    pageSize: 10,
    sorting: [],
    columnFilters: [],
    query: ListQueryConfig.MY_TRAINING_LIST
  })


  if (isLoading || isFetching) {
    return <div className="flex items-center justify-center h-[500px]">
      <FontAwesomeIcon icon={faSpinner} className="text-2xl animate-spin" />
    </div>
  }

  // data?.data?.forEach((training) => {
  //   training.users[0].videoProgressMap = Object.fromEntries(
  //     training.users[0].progress.map(v => [Object.entries(v)[0][0], Object.entries(v)[0][1]])
  //   );
  // })

  console.log("data ======", data);




  return (
    <div className="bg-white rounded-lg  border border-gray-200 overflow-hidden">
      <MyTrainingListView trainingsData={data?.data as IMyTrainingsDto[]} />
    </div>
  )
}

