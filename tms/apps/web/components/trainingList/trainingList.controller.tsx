"use client"
import TraningListComponent from "./list/training.list.component";
import TrainingListFilter from "./list/training.list.filter";
import TrainingListHeader from "./list/training.list.header";

export default function TrainingListController() {
  return (
    <div className="px-6 py-8">
      <TrainingListHeader />
      <TrainingListFilter />
      <TraningListComponent />
    </div>
  );
}
