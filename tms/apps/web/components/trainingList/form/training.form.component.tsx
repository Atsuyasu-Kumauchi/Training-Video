import useLang from "@/lang";
import { useSettings } from "@/tmsui/store";
import { Modal } from "@/tmsui/ui/basic/modal";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useRef } from "react";
import {
  initialValues,
  trainingSchema,
  TTrainingSchema,
} from "./training.form.type";
import TrainingFormView from "./training.form.view";

export default function TrainingFormComponent() {
  const { trainingList } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TTrainingSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TTrainingSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={trainingList.form.title}
    >
      <UiForm
        schema={trainingSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <TrainingFormView />
      </UiForm>
    </Modal>
  );
}
