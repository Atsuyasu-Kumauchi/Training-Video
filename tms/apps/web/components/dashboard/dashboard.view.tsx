import useLang from "@/lang";
import { humanTime } from "@/tmsui";
import { Loader } from "@/common";
import {
  faBook,
  faClipboardCheck,
  faGraduationCap,
  faUser,
  faUserPlus,
  faUsers,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { DashboardStats, RecentActivityItem } from "./dashboard.component";

interface DashboardViewProps {
  stats?: DashboardStats;
  isLoading: boolean;
  isError: boolean;
}

export default function DashboardView({ stats, isLoading, isError }: DashboardViewProps) {
  const lang = useLang();

  const getActivityIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'user_registered':
        return { icon: faUserPlus, bgColor: 'bg-green-100', textColor: 'text-green-600' };
      case 'training_completed':
        return { icon: faGraduationCap, bgColor: 'bg-blue-100', textColor: 'text-blue-600' };
      case 'video_uploaded':
        return { icon: faVideo, bgColor: 'bg-purple-100', textColor: 'text-purple-600' };
      case 'test_created':
        return { icon: faClipboardCheck, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' };
      default:
        return { icon: faUserPlus, bgColor: 'bg-gray-100', textColor: 'text-gray-600' };
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ja-JP');
  };

  if (isLoading) {
    return (
      <div className="px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{lang.dashboard.dashboard}</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-800">データの読み込みに失敗しました。もう一度お試しください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{lang.dashboard.dashboard}</h1>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className=" text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{lang.dashboard.totalNumberOfUsers}</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalUsers)}</p>
            </div>
          </div>
        </div>
        {/* Active Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBook}
                  className=" text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {lang.dashboard.activeTraining}
              </p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.activeTrainings)}</p>
            </div>
          </div>
        </div>
        {/* Total Videos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="fas fa-video text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{lang.dashboard.totalNumberOfVideos}</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalVideos)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">
              {lang.dashboard.recentActivity}
            </h3>
          </div>
          <div className="p-6">
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => {
                  const { icon, bgColor, textColor } = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-7 h-7 ${bgColor} rounded-full flex items-center justify-center`}>
                          <FontAwesomeIcon
                            icon={icon}
                            className={`${textColor} text-xs`}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.description}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {humanTime(new Date(activity.timestamp))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-gray-500">最近のアクティビティはありません。</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{lang.dashboard.quickActions}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/admin/tags"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageTags}
              </Link>
              <Link
                href="/admin/video-list"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faVideo}
                  className="fas fa-video w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageVideos}
              </Link>
              <Link
                href="/admin/training-list"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="fas fa-book w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageYourTraining}
              </Link>
              <Link
                href="/admin/create-test"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="fas fa-clipboard-check w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.createATest}
              </Link>
              {/* <Link
                href="/admin/add-test"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="fas fa-plus-circle w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.addANewTest}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
