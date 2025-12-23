import useLang from "@/lang";
import { Button, UiFormTextArea } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { TAssignmentListSchema } from "./assignmentList.form.type";

export default function AssignmentListFormView() {
  const { listOfIssues } = useLang();
  const { setIsOpen } = useSettings();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormTextArea<TAssignmentListSchema>
          name="question"
          label={listOfIssues.form.question}
          placeholder={listOfIssues.form.questionPlaceholder}
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => setIsOpen(false)}>
          {listOfIssues.form.cancel}
        </Button>
        <Button type="submit"> {listOfIssues.form.subBtn}</Button>
      </div>
    </div>
  );
}
