import useLang from "@/lang";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TagListFilter() {
    const { tag } = useLang();
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div>
                    <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700 mb-2">{tag.filter.searchForTags}</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="fas fa-search text-gray-400" />
                        </div>
                        <input type="text" id="searchInput"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder={tag.filter.searchPlaceholder} />
                    </div>
                </div>
                {/* Status Filter */}
                <div>
                    <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">{tag.filter.status}</label>
                    <select id="statusFilter" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="">すべてのステータス</option>
                        <option value="Active">アクティブ</option>
                        <option value="Inactive">非アクティブ</option>
                    </select>
                </div>
            </div>
        </div>

    )
}