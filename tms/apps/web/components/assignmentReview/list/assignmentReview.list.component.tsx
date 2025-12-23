import { CAssignmentReviewDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import AssignmentReviewView from "../assignmentReview.view";
import { assignmentReviewListColumn } from "./assignmentReview.list.column";


export default function AssignmentReviewListComponent() {
  const listHook = useList<CAssignmentReviewDto>({
    columns: assignmentReviewListColumn,
    query: ListQueryConfig.ASSIGNMENT_REVIEW_LIST
  })
  return (
    <AssignmentReviewView />
    // <ListTable {...listHook} />
  )
}
