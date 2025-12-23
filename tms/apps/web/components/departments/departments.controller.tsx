"use client"
import DepartmentsFormComponent from "./form/departments.form.component";
import DepartmentsListComponent from "./list/departments.list.component";
import DepartmentsListHeader from "./list/departments.list.header";

export default function DepartmentsController() {
  return (
    <div className="px-6 py-8">
      <DepartmentsListHeader />
      <DepartmentsListComponent />
      <DepartmentsFormComponent />
    </div>
  );
}
