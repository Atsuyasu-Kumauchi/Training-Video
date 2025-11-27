import {
  faClipboardCheck,faEdit,faEye,faPlus,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateTestView() {
  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Test</h2>
        </div>
        <a
          href="add-test.html"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPlus} className="fas fa-users w-5 h-5 mr-3 text-white" />
          Create New Test
        </a>
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
                <option >All Status</option>
                <option value="active">Active</option>
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
                  placeholder="Search by test name..."
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
      {/* Tests Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">
                  Questions
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
                      <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClipboardCheck} className="fas fa-users w-5 h-5 text-white text-sm" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        JavaScript Basics Quiz
                      </div>
                      <div className="text-sm text-gray-500">
                        Test fundamental JavaScript concepts
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  20
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
                      <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
                       <FontAwesomeIcon icon={faClipboardCheck} className="fas fa-users w-5 h-5 text-white text-sm" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Leadership Assessment
                      </div>
                      <div className="text-sm text-gray-500">
                        Evaluate leadership competencies
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  15
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
                      <div className="h-10 w-10 rounded-lg bg-yellow-600 flex items-center justify-center">
                       <FontAwesomeIcon icon={faClipboardCheck} className="fas fa-users w-5 h-5 text-white text-sm" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Workplace Safety Quiz
                      </div>
                      <div className="text-sm text-gray-500">
                        Safety protocols and procedures
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  25
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
                      <div className="h-10 w-10 rounded-lg bg-pink-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClipboardCheck} className="fas fa-users w-5 h-5 text-white text-sm"/>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Communication Skills Test
                      </div>
                      <div className="text-sm text-gray-500">
                        Interpersonal communication assessment
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  18
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
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClipboardCheck} className="fas fa-users w-5 h-5 text-white text-sm"
                      />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Compliance Training Test
                      </div>
                      <div className="text-sm text-gray-500">
                        Legal and regulatory compliance
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  30
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
              <span>Showing 1 to 5 of 5 tests</span>
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
