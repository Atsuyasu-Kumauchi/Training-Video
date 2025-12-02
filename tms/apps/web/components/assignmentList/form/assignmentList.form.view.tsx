import {
  Button,
  UiFormInput
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { TAssignmentListSchema } from "./assignmentList.form.type";

export default function AssignmentListFormView() {
  const { setIsOpen } = useSettings();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TAssignmentListSchema> name="question" label="Question" />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          color="neutral"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </Button>
        <Button type="submit">Create Assignment</Button>
      </div>
    </div>
  );
}
