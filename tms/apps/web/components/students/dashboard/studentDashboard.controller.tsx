"use client";
import { DASHBOARD } from "@/common";
import { AuthServer } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import DashboardListColumn from "./list/dashboard.list.column";
import DashboardListFilter from "./list/dashboard.list.filter";
import DashboardListHeader from "./list/dashboard.list.header";

export interface StudentDashboardStats {
  totalTrainings: number;
  completedTrainings: number;
  inProgressTrainings: number;
  recentActivity: StudentRecentActivityItem[];
}

export interface StudentRecentActivityItem {
  type: 'training_assigned' | 'training_completed';
  title: string;
  description: string;
  timestamp: string;
}

export default function StudentsDashboardController() {
  const { data, isLoading } = useQuery<StudentDashboardStats>({
    queryKey: ["student-dashboard-stats"],
    queryFn: async () => {
      const response = await AuthServer({
        method: "GET",
        url: DASHBOARD.STUDENT_STATS,
      });
      return response.data;
    },
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: true,
  });

  return (
    <div className="px-6 py-8">
      <DashboardListHeader />
      <DashboardListFilter stats={data} isLoading={isLoading} />
      <DashboardListColumn recentActivity={data?.recentActivity} isLoading={isLoading} />
    </div>
  );
}
