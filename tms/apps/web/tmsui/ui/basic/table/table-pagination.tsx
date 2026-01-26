import { TListTableHeader } from "./types";

export function TablePagination<T>({ table, dataSource }: TListTableHeader<T>) {


    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const totalRows = dataSource?.resultCount ?? 0;

    const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));

    const safePageIndex = Math.min(pageIndex, pageCount - 1);

    const from = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
    const to = Math.min(totalRows, (safePageIndex + 1) * pageSize);


    return (
        <div className="px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                    <span>
                        {from} 〜 {to} 件 / 全 {dataSource?.resultCount} 件を表示
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="px-3 py-1 cursor-pointer text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        前へ
                    </button>
                    {Array.from({ length: pageCount }).map((_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${pageIndex === i
                                ? "text-white bg-primary-600 border-primary-600"
                                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                                }`}
                            onClick={() => table.setPageIndex(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="px-3 cursor-pointer py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        次へ
                    </button>
                </div>
            </div>
        </div>
    );
}
