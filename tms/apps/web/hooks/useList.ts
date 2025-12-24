"use client";
import { AuthServer } from "@/tmsui/core";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { AxiosInstance } from "axios";
import { useState } from "react";
import { useFetchListQuery } from "./useFetchListQuery";

interface IQueryConfig {
    key: string[];
    url: string;
}

export interface IUseListTableOptions<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    query: IQueryConfig;
    title?: string;
    pageSize?: number;
    filters?: Record<string, string | number | boolean | undefined | null>;
    server?: AxiosInstance;
    enableGlobalSearch?: boolean;
    showFilterColumns?: boolean;
    sortBy?: string;
    staleTime?: number;
}

export function useList<TData, TValue = unknown>({
    columns,
    query,
    title,
    pageSize = 10,
    filters,
    server = AuthServer,
    enableGlobalSearch,
    showFilterColumns = true,
    sortBy = "updatedAt:desc",
    staleTime,
}: IUseListTableOptions<TData, TValue>) {

    const [sorting, setSortingState] = useState<SortingState>([]);
    const [columnFilters, setColumnFiltersState] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilterState] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const setPageIndexZero = () => setPagination((prev) => ({ ...prev, pageIndex: 0 }));

    const setSorting = (updater: SortingState | ((old: SortingState) => SortingState)) => {
        setSortingState(updater);
        setPageIndexZero();
    };

    const setColumnFilters = (updater: | ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState),) => {
        setColumnFiltersState(updater);
        setPageIndexZero();
    };

    const setGlobalFilter = (value: string) => {
        setGlobalFilterState(value);
        setPageIndexZero();
    };

    const { data, isLoading, isError, error } = useFetchListQuery<TData>({
        query,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        server,
        staleTime,
        globalFilter,
        sorting,
        columnFilters,
        filters,
        sortBy,
    });

    const table = useReactTable({
        data: data?.data || [],
        columns,
        pageCount: data?.pageCount ?? -1,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
    });

    return {
        table,
        columns,
        globalFilter,
        setGlobalFilter,
        isLoading,
        isError,
        error,
        data,
        title,
        pageSize,
        enableGlobalSearch,
        showFilterColumns,
    };
}
