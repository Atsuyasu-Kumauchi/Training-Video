import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useLang from "@/lang";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TagListFilter() {
    const { tag } = useLang();
    const router = useRouter();
    const searchParams = useSearchParams();

    const status = searchParams.get("statusFilter") ?? "";
    const [searchText, setSearchText] = useState(
        searchParams.get("nameFilter") ?? ""
    );

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);

        router.push(`?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((val: string) => {
        updateQuery("nameFilter", val);
    }, 1000);

    const onSearchChange = (val: string) => {
        setSearchText(val);
        debouncedSearch(val);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tag.filter.searchForTags}
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>

                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder={tag.filter.searchPlaceholder}
                            value={searchText}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {tag.filter.status}
                    </label>

                    <select
                        value={status}
                        onChange={(e) => updateQuery("statusFilter", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option value="">すべてのステータス</option>
                        <option value="true">アクティブ</option>
                        <option value="false">非アクティブ</option>
                    </select>
                </div>

            </div>
        </div>
    );
}
