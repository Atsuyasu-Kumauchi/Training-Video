import { faBook, faCheck, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StudentsDashboardView() {



  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="text-white text-sm" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">総トレーニング数</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        {/* Completed Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">完了</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>
        {/* In Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faClock} className="text-white text-sm" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">進行中</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>
      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">通知</h2>
          <p className="text-sm text-gray-500 mt-1">最新のアクティビティを確認</p>
        </div>
        <div className="p-6">
          <div className="space-y-4" id="notificationsList">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 ">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faBook} className="text-blue-600 text-lg" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">新しいトレーニングが割り当てられました</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">2時間前</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">新しいトレーニングが割り当てられました: &quot;高度なJavaScriptの概念&quot;</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 opacity-75">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-lg" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">トレーニング完了</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">1日前</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">おめでとうございます！「JavaScript基礎」を92%のスコアで完了しました</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}
