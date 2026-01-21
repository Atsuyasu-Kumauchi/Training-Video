import { cn } from "@/tmsui/utility";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flexRender } from "@tanstack/react-table";
import { TListTableHeader } from "./types";

export function TableBody<T>({ table, }: TListTableHeader<T>) {
    const rows = table.getRowModel().rows;

    return (
        <tbody className="bg-white divide-y divide-gray-200" >
            {rows.length > 0 ? rows.map((row, index) => {
                return (
                    <tr
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn("hover:bg-gray-50 transition-colors duration-200")} >
                        {row.getVisibleCells().map((cell) => {
                            const size = cell.column.getSize();
                            const minSize = cell.column.columnDef.minSize ?? "unset";
                            const maxSize = cell.column.columnDef.maxSize ?? "unset";
                            return (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap"
                                    style={{
                                        width: `${size}px`,
                                        minWidth: minSize === "unset" ? minSize : `${minSize}px`,
                                        maxWidth: maxSize === "unset" ? maxSize : `${maxSize}px`,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            );
                        })}
                    </tr>
                )
            }) : (
                <tr>
                    <td colSpan={table.getAllColumns().length} className="text-center py-4">
                        <div>
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-gray-500" />
                            <p className="text-gray-500 text-sm  ">no data available</p>
                        </div>
                    </td>
                </tr>
            )}

        </tbody>
    )
}


{/* <tbody className="bg-white divide-y divide-gray-200">
    <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            JD
                        </span>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        John Doe
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
                john.doe@example.com
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            IT Department
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer">
                8
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
                6
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="fas fa-users w-5 h-5 mr-3 text-red-600"
                    />
                </button>
            </div>
        </td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            SW
                        </span>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        Sarah Wilson
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
                sarah.wilson@example.com
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            HR Department
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer">
                12
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
                10
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="fas fa-users w-5 h-5 mr-3 text-red-600"
                    />
                </button>
            </div>
        </td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            MJ
                        </span>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        Mike Johnson
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
                mike.johnson@example.com
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            Finance Department
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer">
                5
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
                3
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="fas fa-users w-5 h-5 mr-3 text-red-600"
                    />
                </button>
            </div>
        </td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            EB
                        </span>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        Emily Brown
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
                emily.brown@example.com
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            Marketing Department
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer">
                3
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
                1
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Inactive
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="fas fa-users w-5 h-5 mr-3 text-red-600"
                    />
                </button>
            </div>
        </td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                            DL
                        </span>
                    </div>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        David Lee
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
                david.lee@example.com
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            Operations Department
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer">
                15
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
                12
            </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                    />
                </button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="fas fa-users w-5 h-5 mr-3 text-red-600"
                    />
                </button>
            </div>
        </td>
    </tr>
</tbody> */}