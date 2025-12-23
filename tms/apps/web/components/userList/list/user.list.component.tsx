import { ListQueryConfig } from "@/common";
import { CUserDto } from "@/common/dto";
import { useList } from "@/hooks/useList";
import UserView from "../user.view";
import { userListColumn } from "./user.list.column";

export default function UserListComponent() {
    const listHook = useList<CUserDto>({
        columns: userListColumn,
        query: ListQueryConfig.USER
    })

    return (

        // <ListTable {...listHook} />
        <UserView />
    )
}