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
    setIsSidebarOpen(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setIsSidebarOpen]);

  SidebarAutohide();


  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <div className={cn("flex-1 flex transition-all duration-300 min-w-0", rightSidebar ? "flex-row" : "flex-col")}>
        <div className={cn("flex-1 flex flex-col")} >
          <StudentHeader />
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
        <div className="bg-white shadow-lg border-l border-gray-200 flex flex-col">
          {rightSidebar}
        </div>
      </div>
    </div>
  );
}
