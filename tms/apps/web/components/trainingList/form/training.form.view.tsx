import {
  Button,
  Modal,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
  UiFormInput,
  UiFormSelect,
  UiFormTextArea,
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import {
  initialValues,
  members,
  status,
  trainingSchema,
  TTrainingSchema,
  videos,
} from "./training.form.type";

export default function TrainingFormView() {
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
      title="Add New Training"
    >
      <UiForm
        schema={trainingSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="px-6 py-8">
          <div className="space-y-4">
            <UiFormInput<TTrainingSchema>
              name="name"
              label="Name"
              placeholder="Enter your text here.."
            />
            <UiFormTextArea<TTrainingSchema>
              name="description"
              label="Description"
            />
            <UiFormSelect<TTrainingSchema>
              name="videos"
              label="Select Videos"
              options={videos}
            />
            <UiFormSelect<TTrainingSchema>
              name="users"
              label="Select Users(Optional)"
              options={members}
            />
            <UiFormSelect<TTrainingSchema>
              name="group"
              label="Select User Group(Optional)"
              options={members}
            />
            <UiFormSelect<TTrainingSchema>
              name="status"
              label="Status"
              options={status}
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                color="neutral"
                onClick={() => setIsOpen(false)}
              >
                Cancle
              </Button>
              <Button type="submit">Create Training</Button>
            </div>
          </div>
        </div>
      </UiForm>
    </Modal>
  );
}
