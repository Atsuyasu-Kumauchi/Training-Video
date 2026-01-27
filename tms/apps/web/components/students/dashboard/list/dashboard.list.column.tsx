import useStudentLang from "@/lang/students";
import { faBook, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardListColumn() {
  const { dashboard } = useStudentLang();
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
          <div className="space-y-4" id="notificationsList">
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 ">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-blue-600 text-lg"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {dashboard.list.training_assigned}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {" "}
                      2 {dashboard.list.hours_age}
                    </span>
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {dashboard.list.training_assigned_desc}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 opacity-75">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-600 text-lg"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {" "}
                    {dashboard.list.training_complete}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {" "}
                      1 {dashboard.list.days_age}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {dashboard.list.training_complete_desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardListColumn;
