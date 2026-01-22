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
            simplenameFilter: searchParams.get("simplenameFilter")
        }
    })

    listHook.data?.data?.forEach((user: CUserDto) => {
        user.reviewers.forEach((reviewer: number, index: number) => {
            switch (index) {
                case 0:
                    user.firstReview = reviewer
                    break;
                case 1:
                    user.secondReview = reviewer
                    break;
                case 2:
                    user.finalReview = reviewer
                    break;
            }
        })
    })

    return (
        <ListTable {...listHook} />
    )
}