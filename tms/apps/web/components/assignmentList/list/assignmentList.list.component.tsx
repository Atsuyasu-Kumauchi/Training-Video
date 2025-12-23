import { CAssignmentListDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import AssignmentListView from "../assignmentList.view";
import { assignmentListColumn } from "./assignmentList.list.column";


export default function AssignmentListComponent() {
  const listHook = useList<CAssignmentListDto>({
    columns: assignmentListColumn,
    query: ListQueryConfig.ASSIGNMENT_LIST
  })
  return (
    <AssignmentListView />
    // <ListTable {...listHook} />
  )
}
