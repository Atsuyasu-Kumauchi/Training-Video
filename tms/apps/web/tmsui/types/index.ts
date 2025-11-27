import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { ComponentType } from "react";

export type TListColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    filterComponent?: ComponentType<{
        column: Column<TData, TValue>;
        table: Table<TData>;
    }>;
};
