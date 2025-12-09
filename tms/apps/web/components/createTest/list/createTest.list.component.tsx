import { CTestCreationDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import CreateTestView from "../createTest.view";
import { createTestListColumn } from "./createTest.list.column";


export default function CreateTestListComponent() {
  const listHook = useList<CTestCreationDto>({
    columns: createTestListColumn,
    query: ListQueryConfig.TEST_CREATION_LIST
  })
  return (
    <CreateTestView />
    // <ListTable {...listHook} />
  )
}
