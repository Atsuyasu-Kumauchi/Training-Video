import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rolesTableData } from "./roles.list.type";

export default function RolesListView() {
  const { setIsOpen } = useSettings();
  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Roles</h2>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon
            icon={faPlus}
            className="fas fa-users w-5 h-5 mr-3 text-white"
          />
          Add Role
        </Button>
      </div>
      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              id="rolesTableBody"
            >
              {rolesTableData.map((role) => (
                <tr
                  className="hover:bg-gray-50 transition-colors duration-200"
                  key={role.id}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {role.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            role.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }"
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
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
        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <span id="paginationInfo">Showing 1 to 5 of 5 results</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                id="prevBtn"
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                id="nextBtn"
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
