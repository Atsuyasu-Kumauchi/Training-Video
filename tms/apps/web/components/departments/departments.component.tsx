import DepartmentsFormComponent from "./form/departments.form.component";
import DepartmentsListComponent from "./list/departments.list.component";

export default function DepartmentsComponent() {
  return (
    <>
      <DepartmentsListComponent />
      <DepartmentsFormComponent />
    </>
  );
}
