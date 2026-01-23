"use client"
import { DASHBOARD } from "@/common";
import { AuthServer } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import DashboardView from "./dashboard.view";

export interface DashboardStats {
  totalUsers: number;
  activeTrainings: number;
  totalVideos: number;
  recentActivity: RecentActivityItem[];
}

export interface RecentActivityItem {
  type: 'user_registered' | 'training_completed' | 'video_uploaded' | 'test_created';
  title: string;
  description: string;
  timestamp: string;
}

export default function DashboardComponent() {
  const { data, isLoading, isError } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await AuthServer({
        method: "GET",
        url: DASHBOARD.STATS,
      });
      return response.data;
    },
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: true,
  });

  return (
    <DashboardView 
      stats={data} 
      isLoading={isLoading} 
      isError={isError} 
    />
  );
}