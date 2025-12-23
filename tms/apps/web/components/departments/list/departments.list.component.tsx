import { ListQueryConfig } from "@/common";
import { CDepartmentDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import DepartmentsListView from "../departments.list.view";
import { departmentsListColumn } from "./departments.list.column";

export default function DepartmentsListComponent() {
  const listHook = useList<CDepartmentDto>({
    columns: departmentsListColumn,
    query: ListQueryConfig.DEPARTMENT_LIST
  })
  return (
    // <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <DepartmentsListView />
    // {/* <ListTable {...listHook} /> */}
    // </div>
  )
}
