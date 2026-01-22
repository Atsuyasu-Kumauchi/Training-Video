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

  // data?.data?.forEach((training) => {
  //   training.users[0].videoProgressMap = Object.fromEntries(
  //     training.users[0].progress.map(v => [Object.entries(v)[0][0], Object.entries(v)[0][1]])
  //   );
  // })

  // console.log("data ======", data);




  return (
    <>
      <MyTrainingListView trainingsData={data?.data as IMyTrainingsDto[]} />
    </>
  )
}