"use client";
import { useSettings } from "@/tmsui/store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AdminHeader() {
  const { toggleSidebar, setIsSidebarOpen } = useSettings();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Open on mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            id="openSidebar"
            className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
          {/* Toggle on desktop */}
          <button
            onClick={toggleSidebar}
            id="toggleSidebar"
            className="hidden lg:block text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <span className="text-gray-700 font-medium">Admin User</span>
                <i className="fas fa-chevron-down text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
