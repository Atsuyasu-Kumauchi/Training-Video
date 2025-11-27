import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
import { TUiListTableProps } from "./types";

export function Table<TData, TValue>({
    table,
}: TUiListTableProps<TData, TValue>) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] divide-y divide-gray-200">
                <TableHeader table={table} />
                <TableBody table={table} />
            </table>
        </div>
    )
}