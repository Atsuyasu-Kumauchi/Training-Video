import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { ComponentType, RefObject } from "react";
import { FieldValues } from "react-hook-form";
import { TUiFormRef } from "../ui";

export type TListColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    filterComponent?: ComponentType<{
        column: Column<TData, TValue>;
        table: Table<TData>;
    }>;
};

export type TFormViewSchema<FormType extends FieldValues> = {
    formRef: RefObject<TUiFormRef<FormType> | null>;
  };