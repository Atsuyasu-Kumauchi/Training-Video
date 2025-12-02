import { useLang } from "@/lang";
import { useSettings } from "@/tmsui/store";
import { Modal } from "@/tmsui/ui/basic/modal";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useRef } from "react";
import { assignmentListSchema, initialValues, TAssignmentListSchema } from "./assignmentList.form.type";
import AssignmentListFormView from "./assignmentList.form.view";

export default function AssignmentListFormComponent() {
  const { listOfIssues } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TAssignmentListSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TAssignmentListSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={listOfIssues.form.question}
    >
      <UiForm
        schema={assignmentListSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <AssignmentListFormView />
      </UiForm>
    </Modal>
  )
}
