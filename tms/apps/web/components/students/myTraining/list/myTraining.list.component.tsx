import { IMyTrainingsDto, ListQueryConfig } from "@/common";
import { useFetchListQuery } from "@/hooks";
import MyTrainingListView from "./myTraining.list.view";

export default function MyTrainingListComponent() {
  // const { data } = useList<CMyTrainingsDto>({
  //   columns: myTrainingListColumn,
  //   query: ListQueryConfig.MY_TRAINING_LIST
  // })

  const { data } = useFetchListQuery<IMyTrainingsDto>({
    pageIndex: 0,
    pageSize: 10,
    sorting: [],
    columnFilters: [],
    query: ListQueryConfig.MY_TRAINING_LIST
  })

  console.log("trainingsData", data);


  return (
    <>
      <MyTrainingListView trainingsData={data?.data as IMyTrainingsDto[]} />
    </>
  )
}