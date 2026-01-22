import { ListQueryConfig } from "@/common";
import { CTagDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { useSearchParams } from "next/navigation";
import { tagListColumn } from "./tag.list.column";

export default function TagListComponent() {
  const searchParams = useSearchParams();
  const listHook = useList<CTagDto>({
    columns: tagListColumn,
    query: ListQueryConfig.TAG_LIST,
    filters: {
      statusFilter: searchParams.get("statusFilter"),
      nameFilter: searchParams.get("nameFilter"),
    }
  })

  return (
    <ListTable {...listHook} />
  )
}