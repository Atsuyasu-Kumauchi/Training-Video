import useLang from "@/lang";
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
import { UiFormSelect2 } from "@/tmsui/ui/UiFormSelect2";
import { useRef } from "react";
import {
  initialValues,
  members,
  status,
  tagName,
  trainingSchema,
  TTrainingSchema,
  videos,
} from "./training.form.type";

export default function TrainingFormView() {
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
        <div className="px-6 py-8">
          <div className="space-y-4">
            <UiFormInput<TTrainingSchema>
              name="name"
              label={trainingList.form.trainingName}
              placeholder={trainingList.form.trainNamePlaceholder}
            />
            <UiFormTextArea<TTrainingSchema>
              name="description"
              label={trainingList.form.explanation}
              placeholder={trainingList.form.explanationPlaceholder}
            />
            <UiFormSelect<TTrainingSchema>
              name="videos"
              label={trainingList.form.selectVideo}
              options={videos}
            />
            <UiFormSelect<TTrainingSchema>
              name="users"
              label={trainingList.form.selectUser}
              options={members}
            />
            <UiFormSelect<TTrainingSchema>
              name="group"
              label={trainingList.form.selectGroup}
              options={members}
            />
            <UiFormSelect2<TTrainingSchema>
              label={trainingList.form.tags}
              name="tag"
              options={tagName}
            />
            <UiFormSelect<TTrainingSchema>
              name="status"
              label={trainingList.form.status}
              options={status}
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                color="neutral"
                onClick={() => setIsOpen(false)}
              >
                {trainingList.form.cancel}
              </Button>
              <Button type="submit">
                {" "}
                {trainingList.form.createATraining}
              </Button>
            </div>
          </div>
        </div>
      </UiForm>
    </Modal>
  );
}
