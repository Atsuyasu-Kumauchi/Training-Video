"use client";

import { useSettings } from "@/tmsui/store";
import { useEffect } from "react";
import SidebarAutohide from "../../../hooks/sidebarAutohide";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";

type IAdminLayout = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: IAdminLayout) {
  const { setIsSidebarOpen } = useSettings();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Set initial state
    setIsSidebarOpen(mediaQuery.matches);

    // Listener to update state on change
    const handleChange = (event: MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };

    // Modern: addEventListener instead of deprecated .addListener
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setIsSidebarOpen]);

  // Auto-hide sidebar on mobile route change
  SidebarAutohide();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div
        id="mainContent"
        className="flex-1 flex flex-col transition-all duration-300 min-w-0"
      >
        {/* Top Navigation */}
        <AdminHeader />
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
