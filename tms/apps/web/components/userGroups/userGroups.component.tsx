import UserGroupFormComponent from "./form/userGroup.form.component";
import UserGroupsListComponent from "./list/userGroups.list.component";

export default function UserGroupsComponent() {
  return (
    <>
      <UserGroupsListComponent />
      <UserGroupFormComponent />
    </>
  );
}
