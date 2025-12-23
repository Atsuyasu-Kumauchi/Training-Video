"use client"

import ResultsListComponent from "./list/results.list.component";
import ResultsListHeader from "./list/results.list.header";

export default function ResultsController() {
  return (
    <div className="px-6 py-8">
      <ResultsListHeader />
      <div className="bg-white rounded-lg  border border-gray-200 overflow-hidden">
        <ResultsListComponent />
      </div>
    </div>
  );
}
