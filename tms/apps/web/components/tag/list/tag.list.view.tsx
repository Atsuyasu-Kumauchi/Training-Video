import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupsTableData } from "./tag.list.type";

export default function TagListView() {
  const { setIsOpen } = useSettings();
  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Groups</h1>
          <p className="text-gray-600 mt-1">
            Manage user groups and their members
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon
            icon={faPlus}
            className="fas fa-users w-5 h-5 mr-3 text-white"
          />
          Add New Group
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label
              htmlFor="searchInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Groups
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400" />
              </div>
              <input
                type="text"
                id="searchInput"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by group name..."
              />
            </div>
          </div>
          {/* Status Filter */}
          <div>
            <label
              htmlFor="statusFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              id="statusFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Department Filter */}
          <div>
            <label
              htmlFor="departmentFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Department
            </label>
            <select
              id="departmentFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>All Departments</option>
              <option value="IT Department">IT Department</option>
              <option value="HR Department">HR Department</option>
              <option value="Finance Department">Finance Department</option>
              <option value="Marketing Department">Marketing Department</option>
              <option value="Sales Department">Sales Department</option>
              <option value="Operations Department">
                Operations Department
              </option>
            </select>
          </div>
        </div>
      </div>
      {/* Groups Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">User Groups</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and organize users into groups
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupsTableData.map((group) => (
                <tr className="hover:bg-gray-50" key={group.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faUsers}
                            className=" text-white text-sm"
                          />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {group.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {group.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {group.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-900 font-medium">
                      {group.memberCount} members
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-900 font-medium">
                      {group.courseCount} courses
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FontAwesomeIcon
                      icon={faEye}
                      className=" text-white text-sm"
                    />
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${group.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.createdDate}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
