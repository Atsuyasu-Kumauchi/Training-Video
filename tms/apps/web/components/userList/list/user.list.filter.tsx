import useLang from "@/lang";

export default function UserListFilter() {
    const { user } = useLang();
    const onStatusFilterChange = (value: string) => {
        console.log(value);
    }
    const onDepartmentFilterChange = (value: string) => {
        console.log(value);
    }
    const onSearchFilterChange = (value: string) => {
        console.log(value);
    }
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user.filter.status}
                        </label>
                        <select onChange={(e) => onStatusFilterChange(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">

                            <option value="">すべてのステータス</option>
                            <option value="active">アクティブ</option>
                            <option value="inactive">非アクティブ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user.filter.department}
                        </label>
                        <select onChange={(e) => onDepartmentFilterChange(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            {/* <option>All Departments</option>
                            <option value="it">IT Department</option>
                            <option value="hr">HR Department</option>
                            <option value="finance">Finance Department</option>
                            <option value="marketing">Marketing Department</option>
                            <option value="sales">Sales Department</option>
                            <option value="operations">Operations Department</option> */}
                            <option value="">すべての部門</option>
                            <option value="it">IT部門</option>
                            <option value="hr">HR部門</option>
                            <option value="finance">財務部門</option>
                            <option value="marketing">マーケティング部門</option>
                            <option value="sales">営業部門</option>
                            <option value="operations">運用部門</option>
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
                            />
                            <button
                                id="searchButton"
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                            >
                                {user.filter.search}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}