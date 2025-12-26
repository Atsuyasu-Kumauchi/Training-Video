import { IDepartmentDto, ListQueryConfig } from "@/common";
import { ISelectConvertProps, useFetchList } from "@/hooks";
import useLang from "@/lang";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UserListFilter() {
    const { user } = useLang();
    const router = useRouter();
    const searchParams = useSearchParams();

    const status = searchParams.get("statusFilter") ?? "";
    const department = searchParams.get("departmentIdFilter") ?? "";
    const search = searchParams.get("simplenameFilter") ?? "";

    const [searchText, setSearchText] = useState(search);

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    const onStatusFilterChange = (value: string) => {
        updateQuery("statusFilter", value);
    }

    const onDepartmentFilterChange = (value: string) => {
        updateQuery("departmentIdFilter", value);
    }

    const onSearchFilterChange = () => {
        updateQuery("simplenameFilter", searchText);
    }

    const onClearFilterChange = () => {
        setSearchText("");   // input clear
        router.push("?");    // all query param delete
    }

    const departmentList = useFetchList<IDepartmentDto[]>({
        query: ListQueryConfig.DEPARTMENT_LIST,
        keyName: { label: "name", value: "departmentId" }
    })

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user.filter.status}
                        </label>
                        <select
                            value={status}
                            onChange={(e) => onStatusFilterChange(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >

                            <option value="">すべてのステータス</option>
                            <option value="true">アクティブ</option>
                            <option value="false">非アクティブ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user.filter.department}
                        </label>
                        <select
                            value={department}
                            onChange={(e) => onDepartmentFilterChange(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">すべての部門</option>
                            {departmentList.map((department: ISelectConvertProps, index: number) => (
                                <option key={index} value={department.value}>{department.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user.filter.search}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="searchInput"
                                placeholder={user.filter.searchPlaceholder}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">
                            .
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onSearchFilterChange()}
                                id="searchButton"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                            >
                                {user.filter.search}
                            </button>
                            <button
                                onClick={() => onClearFilterChange()}
                                id="searchButton"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                            >
                                {user.filter.clearFilters}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


