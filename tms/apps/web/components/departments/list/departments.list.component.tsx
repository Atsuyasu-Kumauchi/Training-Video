import { ListQueryConfig } from "@/common";
import { CDepartmentDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { departmentsListColumn } from "./departments.list.column";

export default function DepartmentsListComponent() {
  const listHook = useList<CDepartmentDto>({
    columns: departmentsListColumn,
    query: ListQueryConfig.DEPARTMENT_LIST
  })
  return (
    <ListTable {...listHook} />
  )
}
