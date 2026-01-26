import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
import { TablePagination } from "./table-pagination";
import { TUiListTableProps } from "./types";

export function Table<TData, TValue>({ table, isLoading, isFetching, dataSource }: TUiListTableProps<TData, TValue>) {
    if (isLoading || isFetching) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow" >
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] divide-y divide-gray-200">
                        <TableHeader table={table} />
                        <tbody>
                            <tr>
                                <td colSpan={table.getAllColumns().length}>
                                    <div className="h-[60vh]">
                                        <div className="flex items-center justify-center h-full">
                                            <FontAwesomeIcon icon={faSpinner} size="xl" className="animate-spin text-primary-600" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] divide-y divide-gray-200">
                    <TableHeader table={table} />
                    <TableBody table={table} />
                </table>
            </div>
            <TablePagination table={table} dataSource={dataSource} />
        </div>
    )
}