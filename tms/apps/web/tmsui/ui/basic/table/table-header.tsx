import { flexRender } from "@tanstack/react-table";
import { TListTableHeader } from "./types";

export function TableHeader<T>({ table }: TListTableHeader<T>) {
    return (
        <thead className="bg-gray-50" >
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const size = header.column.getSize();
                        const minSize = header.column.columnDef.minSize ?? "unset";
                        const maxSize = header.column.columnDef.maxSize ?? "unset";
                        return (
                            <th
                                key={header.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                                style={{
                                    width: `${size}px`,
                                    minWidth:
                                        typeof minSize === "number" ? `${minSize}px` : minSize,
                                    maxWidth:
                                        typeof maxSize === "number" ? `${maxSize}px` : maxSize,
                                    whiteSpace: "normal",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                }}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            </th>
                        );
                    })}
                </tr>
            ))}
        </thead>
    )
}
