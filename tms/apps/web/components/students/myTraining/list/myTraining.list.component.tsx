import { IMyTrainingsDto, ListQueryConfig } from "@/common";
import { useFetchListQuery } from "@/hooks";
import MyTrainingListView from "./myTraining.list.view";

export default function MyTrainingListComponent() {

  const { data } = useFetchListQuery<IMyTrainingsDto>({
    pageIndex: 0,
    pageSize: 10,
    sorting: [],
    columnFilters: [],
    query: ListQueryConfig.MY_TRAINING_LIST
  })

  return (
    <>
      <MyTrainingListView trainingsData={data?.data as IMyTrainingsDto[]} />
    </>
  )
}