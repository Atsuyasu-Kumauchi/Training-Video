"use client"

import MyTrainingListComponent from "./list/myTraining.list.component";
import MyTrainingListHeader from "./list/myTraining.list.header";

export default function MyTrainingController() {
  return (
    <div className="px-6 py-8">
      <MyTrainingListHeader />
      <MyTrainingListComponent />
    </div>
  );
}
