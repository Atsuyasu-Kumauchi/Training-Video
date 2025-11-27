"use client";
import { cn } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import {
  faBook,
  faBuilding,
  faClipboardCheck,
  faGraduationCap,
  faKey,
  faTachometerAlt,
  faTimes,
  faUserFriends,
  faUsers,
  faUserTag,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSettings();
  const sidebar = [
    { url: "/dashboard", icon: faTachometerAlt, title: "Dashboard" },
    { url: "/users", icon: faUsers, title: "User List" },
    { url: "/user-groups", icon: faUserFriends, title: "User Groups" },
    { url: "/video-list", icon: faVideo, title: "Video List" },
    { url: "/training-list", icon: faBook, title: "Training List" },
    { url: "/create-test", icon: faClipboardCheck, title: "Create Test" },
    { url: "/departments", icon: faBuilding, title: "Departments" },
    { url: "/roles", icon: faUserTag, title: "Roles" },
    { url: "/change-password", icon: faKey, title: "Change Password" },
  ];

  return (
    <div
      id="sidebar"
      className={cn(
        "w-64 bg-white shadow-lg transform transition-transform duration-300 fixed lg:static inset-y-0 left-0 z-30 flex-shrink-0",
        // Mobile → slide in/out
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop → completely hide if closed
        !isSidebarOpen && "lg:hidden"
      )}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="fas fa-graduation-cap text-white text-sm"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Training Admin</h1>
        </div>
        {/* Close button only visible on mobile */}
        <button
          id="closeSidebar"
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} className="fas fa-times" />
        </button>
      </div>
      <nav className="mt-6 px-3">
        <div className="space-y-3">
          {sidebar?.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200",
                  pathname === item.url &&
                    " text-primary-700 bg-primary-50 rounded-lg border-l-4 border-primary-600"
                )}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="fas fa-tachometer-alt w-5 h-5 mr-3"
                />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
