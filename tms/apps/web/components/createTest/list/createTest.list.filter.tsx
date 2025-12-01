import { useLang } from "@/lang";

export default function TrainingListFilter() {
    const { testCreation } = useLang();
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {testCreation.filter.status}
                        </label>
                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option value="">すべてのステータス</option>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {testCreation.filter.search}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="searchInput"
                                placeholder={testCreation.filter.searchPlaceholder}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                            <button
                                id="searchButton"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                            >
                                {testCreation.filter.search}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}