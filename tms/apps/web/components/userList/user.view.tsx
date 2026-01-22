"use client"

import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserView() {

    const showAssignedTrainings = (userName: string, count: number) => {
        console.log(userName, count);
    }
    const showCompletedTrainings = (userName: string, count: number) => {
        console.log(userName, count);
    }
    const viewUserDetails = (userName: string) => {
        // setIsOpen(true)
    }
    const showEditUserModal = (userName: string) => {
        // setIsOpen(true)
    }


    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">ユーザー</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">メール</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">部門</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">割り当て済みトレーニング</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">完了済みトレーニング</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ステータス</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">アクション</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">JD</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">john.doe@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">IT Department</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showAssignedTrainings('John Doe', 8)}>
                                    8
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedTrainings('John Doe', 6)}>
                                    6
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewUserDetails('John Doe')}>
                                        <FontAwesomeIcon icon={faEye} className="fas fa-eye w-5 h-5" />
                                    </button>
                                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditUserModal('John Doe')}>
                                        <FontAwesomeIcon icon={faEdit} className="fas fa-edit w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                        <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">SW</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">Sarah Wilson</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">sarah.wilson@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">HR Department</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showAssignedTrainings('Sarah Wilson', 12)}>
                                    12
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedTrainings('Sarah Wilson', 10)}>
                                    10
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewUserDetails('Sarah Wilson')}>
                                        <FontAwesomeIcon icon={faEye} className="fas fa-eye w-5 h-5" />
                                    </button>
                                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditUserModal('Sarah Wilson')}>
                                        <FontAwesomeIcon icon={faEdit} className="fas fa-edit w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                        <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">MJ</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">Mike Johnson</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">mike.johnson@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Finance Department</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showAssignedTrainings('Mike Johnson', 5)}>
                                    5
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedTrainings('Mike Johnson', 3)}>
                                    3
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewUserDetails('Mike Johnson')}>
                                        <FontAwesomeIcon icon={faEye} className="fas fa-eye w-5 h-5" />
                                    </button>
                                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditUserModal('Mike Johnson')}>
                                        <FontAwesomeIcon icon={faEdit} className="fas fa-edit w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                        <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">EB</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">Emily Brown</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">emily.brown@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Marketing Department</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showAssignedTrainings('Emily Brown', 3)}>
                                    3
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedTrainings('Emily Brown', 1)}>
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
                                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewUserDetails('Emily Brown')}>
                                        <FontAwesomeIcon icon={faEye} className="fas fa-eye w-5 h-5" />
                                    </button>
                                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditUserModal('Emily Brown')}>
                                        <FontAwesomeIcon icon={faEdit} className="fas fa-edit w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                        <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">DL</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">David Lee</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">david.lee@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Operations Department</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showAssignedTrainings('David Lee', 15)}>
                                    15
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedTrainings('David Lee', 12)}>
                                    12
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewUserDetails('David Lee')}>
                                        <FontAwesomeIcon icon={faEye} className="fas fa-eye w-5 h-5" />
                                    </button>
                                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditUserModal('David Lee')}>
                                        <FontAwesomeIcon icon={faEdit} className="fas fa-edit w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                        <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
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
                        <span>1〜5件 / 全5件を表示</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            前へ
                        </button>
                        <button className="px-3 py-1 text-sm text-white bg-primary-600 border border-primary-600 rounded-md">
                            1
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            次へ
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
