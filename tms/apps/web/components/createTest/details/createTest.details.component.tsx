import { TCreateTestListFormComponentSchema } from "../form/createTest.form.type";
import CreateTestDetailsView from "./createTest.details.view";

export default function CreateTestDetailsComponent(
  props: TCreateTestListFormComponentSchema
) {
  return <CreateTestDetailsView {...props} />;
}
