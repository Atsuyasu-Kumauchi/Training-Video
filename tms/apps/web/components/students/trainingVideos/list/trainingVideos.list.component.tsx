import TrainingVideosListColumn from "./trainingVideos.list.column";

export default function TrainingVideosListComponent() {
  // const listHook = useList({
  //   columns: trainingVideosListColumn,
  //   query: ListQueryConfig.DEPARTMENT_LIST
  // })
  return (
    // <ListTable {...listHook} />
    <TrainingVideosListColumn />
  )
}
