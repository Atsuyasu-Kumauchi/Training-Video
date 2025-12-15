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

  // const departmentApi = async () => {
  //   const response = await AuthServer({
  //     url: ListQueryConfig.DEPARTMENT_LIST.url,
  //     method: "GET",
  //   });
  //   console.log(response.data);
  //   return response.data;
  // }

  // useEffect(() => {
  //   departmentApi();
  // }, []);

  return (
    // <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    // <DepartmentsListView />
    <ListTable {...listHook} />
    // </div>
  )
}
