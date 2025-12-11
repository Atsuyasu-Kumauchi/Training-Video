"use client";

import { useStudentRightBar } from "@/hooks/useStudentRightBar";
import { useSettings } from "@/tmsui/store";
import { cn } from "@/tmsui/utility";
import { useEffect } from "react";
import SidebarAutohide from "../../../hooks/sidebarAutohide";
import { StudentHeader } from "./student-header";
import { StudentSidebar } from "./student-sidebar";

type IStudentLayout = {
  children: React.ReactNode;
};

type IStudentWrapper = {
  children: React.ReactNode;
  rightSidebar: React.ReactNode;
};

export function StudentLayout({ children }: IStudentLayout) {
  const { sidebarContent } = useStudentRightBar();
  return (
    <StudentWrapper rightSidebar={sidebarContent}>
      {children}
    </StudentWrapper>
  );
}

function StudentWrapper({ children, rightSidebar }: IStudentWrapper) {
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
      <StudentSidebar />
      {/* Main Content */}
      <div id="mainContent" className={
        cn("flex-1 flex transition-all duration-300 min-w-0",
          rightSidebar ? "flex-row" : "flex-col"
        )
      }>
        <div className={cn("flex-1 flex flex-col")} >
          {/* Top Navigation */}
          <StudentHeader />
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
        {/* Right Sidebar - Assignment Review */}
        {rightSidebar && (
          <div className="w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col">
            {rightSidebar}
          </div>
        )}
      </div>
    </div>
  );
}
