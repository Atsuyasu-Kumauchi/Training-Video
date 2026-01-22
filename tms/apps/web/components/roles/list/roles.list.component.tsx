import { CRoleDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { rolesListColumn } from "./roles.list.column";

export default function RolesListComponent() {
  const listHook = useList<CRoleDto>({
    columns: rolesListColumn,
    query: ListQueryConfig.ROLE_LIST
  })
  return <ListTable {...listHook} />;
}
