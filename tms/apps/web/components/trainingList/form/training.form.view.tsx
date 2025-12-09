import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect, UiFormTextArea } from "@/tmsui";
import { UiFormSelect2 } from "@/tmsui/ui/UiFormSelect2";
import {
  members,
  status,
  tagName,
  TTrainingSchema,
  videos,
} from "./training.form.type";

export default function TrainingFormView() {
  const { trainingList } = useLang();

  return (
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
          <Button type="button" color="neutral">
            {trainingList.form.cancel}
          </Button>
          <Button type="submit"> {trainingList.form.createATraining}</Button>
        </div>
      </div>
    </div>
  );
}
