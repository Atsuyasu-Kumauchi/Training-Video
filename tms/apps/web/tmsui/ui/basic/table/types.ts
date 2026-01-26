import { ApiResponse } from "@/hooks";
import { ColumnDef, Table as TanStackTable } from "@tanstack/react-table";

export type TListTableProps<TData, TValue> = {
    table: TanStackTable<TData>;
    columns: ColumnDef<TData, TValue>[];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: unknown;
    title?: string;
    data?: ApiResponse<TData>;
    pageSize: number;
    showFilterColumns?: boolean;
    className?: string;
};

export type TUiListTableProps<TData, TValue> = {
    table: TanStackTable<TData>;
    dataSource?: ApiResponse<TData>;
    columns: ColumnDef<TData, TValue>[];
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    error?: unknown;
    title?: string;
    totalElements: number;
    pageSize?: number;
    showFilterColumns?: boolean;
    className?: string;
};


export type TListTableHeader<T> = {
    table: TanStackTable<T>;
    dataSource?: ApiResponse<T>;
};
