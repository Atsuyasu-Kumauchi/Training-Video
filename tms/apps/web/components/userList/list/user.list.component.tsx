import { ListQueryConfig } from "@/common";
import { CUserDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { useSearchParams } from "next/navigation";
import { userListColumn } from "./user.list.column";

export default function UserListComponent() {
    const searchParams = useSearchParams();
    const listHook = useList<CUserDto>({
        columns: userListColumn,
        query: ListQueryConfig.USER,
        filters: {
            statusFilter: searchParams.get("statusFilter"),
            departmentIdFilter: searchParams.get("departmentIdFilter"),
            simplenameFilter: searchParams.get("simplenameFilter"),
        }

    })

    return (
        <ListTable {...listHook} />
    )
}