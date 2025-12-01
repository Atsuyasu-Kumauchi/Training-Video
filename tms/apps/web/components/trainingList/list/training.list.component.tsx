import { CTrainingsDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import TrainingListView from "../training.list.view";
import { trainingListColumn } from "./training.list.column";


export default function TrainingListComponent() {
  const listHook = useList<CTrainingsDto>({
    columns: trainingListColumn,
    query: ListQueryConfig.TRAINING_LIST
  })
  return (
    <TrainingListView />
    // <ListTable {...listHook} />
  )
}
