import { TCreateTestFormComponentSchema } from "../form/createTest.form.type";
import CreateTestDetailsView from "./createTest.details.view";

export default function CreateTestDetailsComponent(
  props: TCreateTestFormComponentSchema,
) {
  return <CreateTestDetailsView {...props} />;
}
