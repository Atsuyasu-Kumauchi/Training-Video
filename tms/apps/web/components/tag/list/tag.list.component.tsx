import { ListQueryConfig } from "@/common";
import { CTagDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { tagListColumn } from "./tag.list.column";
import { groupsTableData } from "./tag.list.type";

export default function TagListComponent() {
  const listHook = useList<CTagDto>({
    columns: tagListColumn,
    query: ListQueryConfig.TAG || groupsTableData
  })

  return <ListTable {...listHook} />
}