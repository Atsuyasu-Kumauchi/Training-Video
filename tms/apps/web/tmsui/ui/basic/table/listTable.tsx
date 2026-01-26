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
    isFetching,

}: TListTableProps<TData, TValue>) {

    return (
        <Table
            table={table}
            dataSource={data}
            columns={columns}
            isLoading={isLoading}
            isFetching={isFetching}
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
