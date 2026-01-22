"use client";
import { Table } from "./table";
import { TListTableProps } from "./types";

export function ListTable<TData, TValue>({
    table,
    columns,
    isLoading,
    isError,
    error,
    title,
    data,
    pageSize,
    showFilterColumns,
    className,
}: TListTableProps<TData, TValue>) {

    return (
        <Table
            table={table}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
            error={error}
            title={title}
            totalElements={data?.resultCount ?? 0}
            pageSize={pageSize}
            showFilterColumns={showFilterColumns}
            className={className}
        />
    );
}
