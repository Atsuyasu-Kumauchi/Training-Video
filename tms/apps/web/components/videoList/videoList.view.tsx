import {
  faEdit,
  faEye,
  faPlay,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VideoListView() {
  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
          <FontAwesomeIcon
            icon={faPlus}
            className="fas fa-users w-5 h-5 mr-3 text-white"
          />
          Add New Video
        </button>
      </div>
      {/* Filters Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option>All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
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
                  placeholder="Search by title or description..."
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
      {/* Videos Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Video
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-24">
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="fas fa-users w-5 h-5 mr-3 text-gray-400 text-lg" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Introduction to JavaScript
                      </div>
                      <div className="text-sm text-gray-500">
                        Learn the basics of JavaScript programming
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Published
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
                    <div className="flex-shrink-0 h-16 w-24">
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="fas fa-users w-5 h-5 mr-3 text-gray-400 text-lg" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        React Fundamentals
                      </div>
                      <div className="text-sm text-gray-500">
                        Complete guide to React development
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Published
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
                    <div className="flex-shrink-0 h-16 w-24">
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="fas fa-users w-5 h-5 mr-3 text-gray-400 text-lg" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        CSS Grid Layout
                      </div>
                      <div className="text-sm text-gray-500">
                        Master CSS Grid for modern layouts
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-08
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Draft
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
                    <div className="flex-shrink-0 h-16 w-24">
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="fas fa-users w-5 h-5 mr-3 text-gray-400 text-lg" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Node.js Backend Development
                      </div>
                      <div className="text-sm text-gray-500">
                        Build robust backend APIs with Node.js
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-05
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Published
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
                    <div className="flex-shrink-0 h-16 w-24">
                      <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="fas fa-users w-5 h-5 mr-3 text-gray-400 text-lg" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Database Design Principles
                      </div>
                      <div className="text-sm text-gray-500">
                        Learn database design best practices
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-03
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Archived
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
              <span>Showing 1 to 5 of 5 videos</span>
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
