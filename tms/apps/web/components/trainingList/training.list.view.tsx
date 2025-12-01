import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrainingListView() {

  const showEnrolledUsers = (training: string, count: number) => {
    console.log(`${training} has ${count} enrolled users`);
  }
  const showCompletedUsers = (training: string, count: number) => {
    console.log(`${training} has ${count} completed users`);
  }
  const showIncompletedUsers = (training: string, count: number) => {
    console.log(`${training} has ${count} incompleted users`);
  }
  const viewTrainingDetails = (training: string) => {
    console.log(`Viewing details for ${training}`);
  }
  const showEditTrainingModal = (training: string) => {
    console.log(`Showing edit modal for ${training}`);
  }
  const deleteTraining = (training: string) => {
    console.log(`Deleting ${training}`);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">トレーニング</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">登録済み</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">完了</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">未完了</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">JavaScript Fundamentals</div>
                  <div className="text-sm text-gray-500">Learn the basics of JavaScript programming</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showEnrolledUsers('JavaScript Fundamentals', 45)}>
                  45
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedUsers('JavaScript Fundamentals', 38)}>
                  38
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer" onClick={() => showIncompletedUsers('JavaScript Fundamentals', 7)}>
                  7
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewTrainingDetails('JavaScript Fundamentals')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditTrainingModal('JavaScript Fundamentals')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteTraining('JavaScript Fundamentals')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Leadership Skills</div>
                  <div className="text-sm text-gray-500">Develop essential leadership competencies</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showEnrolledUsers('Leadership Skills', 28)}>
                  28
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedUsers('Leadership Skills', 22)}>
                  22
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer" onClick={() => showIncompletedUsers('Leadership Skills', 6)}>
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
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewTrainingDetails('Leadership Skills')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditTrainingModal('Leadership Skills')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteTraining('Leadership Skills')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Workplace Safety</div>
                  <div className="text-sm text-gray-500">Essential safety protocols and procedures</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showEnrolledUsers('Workplace Safety', 156)}>
                  156
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedUsers('Workplace Safety', 142)}>
                  142
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer" onClick={() => showIncompletedUsers('Workplace Safety', 14)}>
                  14
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewTrainingDetails('Workplace Safety')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditTrainingModal('Workplace Safety')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteTraining('Workplace Safety')}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Communication Skills</div>
                  <div className="text-sm text-gray-500">Improve interpersonal communication</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showEnrolledUsers('Communication Skills', 67)}>
                  67
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedUsers('Communication Skills', 54)}>
                  54
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer" onClick={() => showIncompletedUsers('Communication Skills', 13)}>
                  13
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewTrainingDetails('Communication Skills')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditTrainingModal('Communication Skills')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">Compliance Training</div>
                  <div className="text-sm text-gray-500">Legal and regulatory compliance requirements</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 cursor-pointer" onClick={() => showEnrolledUsers('Compliance Training', 89)}>
                  89
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer" onClick={() => showCompletedUsers('Compliance Training', 76)}>
                  76
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button className="font-medium text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer" onClick={() => showIncompletedUsers('Compliance Training', 13)}>
                  13
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  アクティブ
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewTrainingDetails('Compliance Training')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditTrainingModal('Compliance Training')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200" onClick={() => deleteTraining('Compliance Training')}>
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
            <span>1〜5件 / 全5件のトレーニングプログラムを表示</span>
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

  );
}
