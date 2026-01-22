import { TUserFormComponentSchema } from "../form/user.form.type";
import UsersDetailsView from "./users.details.view";

export default function UsersDetailsComponent(props: TUserFormComponentSchema) {
  return <UsersDetailsView {...props} />;
}
