import useLang from "@/lang";
import { Button, UiFormInput, UiFormTextArea } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { TAssignmentListFormViewSchema, TAssignmentListSchema } from "./assignmentList.form.type";

export default function AssignmentListFormView({ isEdit, modalRef, isPending }: TAssignmentListFormViewSchema) {
  const { listOfIssues } = useLang();
  const { setIsOpen } = useSettings();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TAssignmentListSchema>
          name="name"
          label={listOfIssues.form.name}
          placeholder={listOfIssues.form.namePlaceholder}
          required
        />
      </div>
      <div className="col-span-12">
        <UiFormTextArea<TAssignmentListSchema>
          name="question"
          label={listOfIssues.form.question}
          placeholder={listOfIssues.form.questionPlaceholder}
          required
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => modalRef?.current?.modalClose()}>
          {listOfIssues.form.cancel}
        </Button>
        <Button type="submit" disabled={isPending} loading={isPending}> {isEdit ? listOfIssues.form.updateBtn : listOfIssues.form.subBtn}</Button>
      </div>
    </div>
  );
}
