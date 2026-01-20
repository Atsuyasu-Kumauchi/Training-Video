import { CTestCreationDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { useSearchParams } from "next/navigation";
import { createTestListColumn } from "./createTest.list.column";

export default function CreateTestListComponent() {
  const searchParams = useSearchParams();
  const listHook = useList<CTestCreationDto>({
    columns: createTestListColumn,
    query: ListQueryConfig.TEST_CREATION_LIST,
    filters: {
      statusFilter: searchParams.get("statusFilter"),
      nameFilter: searchParams.get("nameFilter"),
    },
  });
  return (
    // <CreateTestView />
    <ListTable {...listHook} />
  );
}
