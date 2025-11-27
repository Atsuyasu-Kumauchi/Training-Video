import { faDownload, faEdit,  faEye, faPlus, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserListView() {
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Assigned Training
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Completed Training
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
            </tbody>
          </table>
        </div>
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
  );
}
