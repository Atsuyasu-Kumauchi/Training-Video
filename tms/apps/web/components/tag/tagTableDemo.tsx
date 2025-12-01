import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TagTableDemo() {
    const editGroup = (id: number) => {
        console.log(id);
    }
    const deleteGroup = (id: number) => {
        console.log(id);
    }
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">タグ</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タグ名</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
                        </tr>
                    </thead>
                    <tbody id="groupsTable" className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">IT</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => editGroup(1)} className="text-blue-600 hover:text-blue-900">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteGroup(1)} className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">HR</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-10</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => editGroup(2)} className="text-blue-600 hover:text-blue-900">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteGroup(2)} className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">SALES</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-08</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => editGroup(3)} className="text-blue-600 hover:text-blue-900">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteGroup(3)} className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">MARKETING</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    非アクティブ
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-05</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => editGroup(4)} className="text-blue-600 hover:text-blue-900">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteGroup(4)} className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
