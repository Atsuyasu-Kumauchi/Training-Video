import { IUserDto, IVideoListDto, ListQueryConfig } from "@/common";
import { useFetchList } from "@/hooks";
import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect, UiFormSelect2, UiFormTextArea } from "@/tmsui";
import {
  status,
  TTrainingFormViewSchema,
  TTrainingSchema
} from "./training.form.type";

export default function TrainingFormView({ formRef, modalRef, isEdit, isPending }: TTrainingFormViewSchema) {
  const { trainingList } = useLang();

  return (
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
      <UiFormSelect2<TTrainingSchema>
        name="videos"
        label={trainingList.form.selectVideo}
        placeholder={trainingList.form.selectVideoPlaceholder}
        isMulti
        options={useFetchList<IVideoListDto[]>({
          query: ListQueryConfig.VIDEO_LIST,
          keyName: { label: "name", value: "videoId" }
        })}
      />
      <UiFormSelect2<TTrainingSchema>
        name="users"
        label={trainingList.form.selectUser}
        placeholder={trainingList.form.selectUserPlaceholder}
        isMulti
        options={useFetchList<IUserDto[]>({
          query: ListQueryConfig.USER,
          keyName: { label: "email", value: "userId" }
        })}
      />
      <UiFormInput<TTrainingSchema>
        name="deadline"
        label={trainingList.form.deadline}
        placeholder={trainingList.form.deadlinePlaceholder}
        required
        type="date"
      />
      <UiFormSelect<TTrainingSchema>
        name="status"
        label={trainingList.form.status}
        options={status}
        placeholder={trainingList.form.statusPlaceholder}
      />
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => modalRef?.current?.modalClose()}>
          {trainingList.form.cancel}
        </Button>
        <Button type="submit" disabled={isPending} loading={isPending} > {trainingList.form.createATraining}</Button>
      </div>
    </div>
  );
}
