import useStudentLang from "@/lang/students";
import { faBook, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StudentDashboardStats } from "../studentDashboard.controller";

interface DashboardListFilterProps {
  stats?: StudentDashboardStats;
  isLoading: boolean;
}

function DashboardListFilter({ stats, isLoading }: DashboardListFilterProps) {
  const { dashboard } = useStudentLang();
  return (
    <div>
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
              <p className="text-sm font-medium text-gray-500">
                {dashboard.filter.sessions}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "..." : (stats?.totalTrainings ?? 0)}
              </p>
            </div>
          </div>
        </div>
        {/* Completed Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {" "}
                {dashboard.filter.completion}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "..." : (stats?.completedTrainings ?? 0)}
              </p>
            </div>
          </div>
        </div>
        {/* In Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {dashboard.filter.progress}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "..." : (stats?.inProgressTrainings ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardListFilter;
