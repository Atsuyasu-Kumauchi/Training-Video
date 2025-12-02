import { useSettings } from "@/tmsui/store";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DepartmentsListView() {
  const { setIsOpen } = useSettings();
  const editDepartment = (id: number) => {
    console.log(`Editing department ${id}`);
  }
  const deleteDepartment = (id: number) => {
    console.log(`Deleting department ${id}`);
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" id="departmentsTableBody">
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">IT Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(1)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(1)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">HR Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(2)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(2)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Finance Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(3)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(3)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Marketing Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(4)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(4)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Sales Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(5)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(5)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Operations Department</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => editDepartment(6)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteDepartment(6)}>
                    <FontAwesomeIcon icon={faTrash} />
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
            <span id="paginationInfo">1〜5件 / 全5件を表示</span>
          </div>
          <div className="flex items-center space-x-2">
            <button id="prevBtn" className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              前へ
            </button>
            <button id="nextBtn" className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

