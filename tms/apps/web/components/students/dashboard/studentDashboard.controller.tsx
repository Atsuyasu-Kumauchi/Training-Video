"use client";
import DashboardListColumn from "./list/dashboard.list.column";
import DashboardListFilter from "./list/dashboard.list.filter";
import DashboardListHeader from "./list/dashboard.list.header";

export default function StudentsDashboardController() {
  return (
    <div className="px-6 py-8">
      <DashboardListHeader />
      <DashboardListFilter />
      <DashboardListColumn />
    </div>
  );
}
