"use client";
import { Suspense } from "react";
import CreateTestListComponent from "./list/createTest.list.component";
import CreateTestListFilter from "./list/createTest.list.filter";
import CreateTestListHeader from "./list/createTest.list.header";

export default function CreateTestController() {
  return (
    <div className="px-6 py-8">
      <CreateTestListHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <CreateTestListFilter />
      </Suspense>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CreateTestListComponent />
      </div>
    </div>
  );
}
