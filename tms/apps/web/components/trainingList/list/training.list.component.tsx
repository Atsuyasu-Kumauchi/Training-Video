import { CTrainingsDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { useSearchParams } from "next/navigation";
import { trainingListColumn } from "./training.list.column";


export default function TrainingListComponent() {
  const searchParams = useSearchParams();
  const listHook = useList<CTrainingsDto>({
    columns: trainingListColumn,
    query: ListQueryConfig.TRAINING_LIST,
    filters: {
      statusFilter: searchParams.get("statusFilter"),
      nameFilter: searchParams.get("nameFilter"),
    }
  })

  listHook?.data?.data?.forEach((item) => {
    item.usersIds = item.users.map((user) => user.userId);
  })

  return (
    <ListTable {...listHook} />
  )
}
