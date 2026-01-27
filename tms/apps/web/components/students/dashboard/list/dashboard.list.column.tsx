import useStudentLang from "@/lang/students";
import { faBook, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StudentRecentActivityItem } from "../studentDashboard.controller";

interface DashboardListColumnProps {
  recentActivity?: StudentRecentActivityItem[];
  isLoading: boolean;
}

function DashboardListColumn({ recentActivity, isLoading }: DashboardListColumnProps) {
  const { dashboard } = useStudentLang();

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}日前`;
    } else if (diffInHours > 0) {
      return `${diffInHours}時間前`;
    } else {
      return "たった今";
    }
  };

  const getActivityIcon = (type: string) => {
    if (type === 'training_completed') {
      return faCheckCircle;
    }
    return faBook;
  };

  const getActivityIconColor = (type: string) => {
    if (type === 'training_completed') {
      return 'text-green-600';
    }
    return 'text-blue-600';
  };

  const getActivityBgColor = (type: string) => {
    if (type === 'training_completed') {
      return 'bg-green-50';
    }
    return 'bg-blue-50';
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {" "}
            {dashboard.list.notification}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {" "}
            {dashboard.list.activity}
          </p>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">読み込み中...</div>
          ) : recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4" id="notificationsList">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 ${
                    activity.type === 'training_completed' ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 ${getActivityBgColor(activity.type)} rounded-full flex items-center justify-center`}>
                      <FontAwesomeIcon
                        icon={getActivityIcon(activity.type)}
                        className={`${getActivityIconColor(activity.type)} text-lg`}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.type === 'training_assigned' && (
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {dashboard.list.no_activity || "アクティビティがありません"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardListColumn;
