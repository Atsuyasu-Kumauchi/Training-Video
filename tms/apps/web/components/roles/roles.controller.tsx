import RolesFormComponent from "./form/roles.form.component";
import RolesListComponent from "./list/roles.list.component";
import RolesListHeader from "./list/roles.list.header";

export default function RolesController() {
  return (
    <div className="px-6 py-8">
      <RolesListHeader />
      <RolesListComponent />
      <RolesFormComponent />
    </div>
  );
}
