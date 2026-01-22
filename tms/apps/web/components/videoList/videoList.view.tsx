import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VideoListView() {
  const viewVideoDetails = (title: string) => {
    console.log(title);
  }
  const showEditVideoModal = (title: string) => {
    console.log(title);
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">動画</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">カテゴリ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">再生時間</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">アップロード日</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-gray-400 text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Introduction to JavaScript</div>
                    <div className="text-sm text-gray-500">Learn the basics of JavaScript programming</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Training</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15:30</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  公開済み
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewVideoDetails('Introduction to JavaScript')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditVideoModal('Introduction to JavaScript')}>
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
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-gray-400 text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">React Fundamentals</div>
                    <div className="text-sm text-gray-500">Complete guide to React development</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tutorial</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28:45</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-10</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  公開済み
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewVideoDetails('React Fundamentals')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditVideoModal('React Fundamentals')}>
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
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-gray-400 text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">CSS Grid Layout</div>
                    <div className="text-sm text-gray-500">Master CSS Grid for modern layouts</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Training</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">22:15</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-08</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewVideoDetails('CSS Grid Layout')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditVideoModal('CSS Grid Layout')}>
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
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-gray-400 text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Node.js Backend Development</div>
                    <div className="text-sm text-gray-500">Build robust backend APIs with Node.js</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Presentation</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45:20</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-05</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  公開済み
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewVideoDetails('Node.js Backend Development')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditVideoModal('Node.js Backend Development')}>
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
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <i className="fas fa-play text-gray-400 text-lg" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Database Design Principles</div>
                    <div className="text-sm text-gray-500">Learn database design best practices</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Demo</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">32:10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-03</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Archived
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" onClick={() => viewVideoDetails('Database Design Principles')}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200" onClick={() => showEditVideoModal('Database Design Principles')}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
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
            <span>1〜5件 / 全5件の動画を表示</span>
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
