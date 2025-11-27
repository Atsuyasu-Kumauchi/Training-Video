import { faDownload, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserListComponent from './list/user.list.component'

export default function UserController() {
    return (
        <div className="px-6 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                </div>
                <div className="flex items-center space-x-3">
                    {/* CSV Import Button */}
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                        <FontAwesomeIcon icon={faDownload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                        Import CSV
                    </button>
                    {/* CSV Export Button */}
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                        <FontAwesomeIcon icon={faUpload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                        Export CSV
                    </button>
                    {/* Add New User Button */}
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                        <FontAwesomeIcon icon={faPlus} className="fas fa-users w-5 h-5 mr-3 text-white" />
                        Add New User
                    </button>
                </div>
            </div>
            {/* Filters Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                <option>All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>
                            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                <option>All Departments</option>
                                <option value="it">IT Department</option>
                                <option value="hr">HR Department</option>
                                <option value="finance">Finance Department</option>
                                <option value="marketing">Marketing Department</option>
                                <option value="sales">Sales Department</option>
                                <option value="operations">Operations Department</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="searchInput"
                                    placeholder="Search by name or email..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                                <button
                                    id="searchButton"
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Users Table Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <UserListComponent />
                {/* Pagination */}
                <div className="px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-700">
                            <span>Showing 1 to 5 of 5 results</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm text-white bg-primary-600 border border-primary-600 rounded-md">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
