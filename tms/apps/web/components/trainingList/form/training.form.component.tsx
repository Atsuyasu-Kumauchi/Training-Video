import { ListQueryConfig, TRAINING_LIST } from "@/common";
import { AuthServer, queryClient, wait } from "@/tmsui";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  initialValues,
  trainingSchema,
  TTrainingFormComponentSchema,
  TTrainingSchema,
} from "./training.form.type";
import TrainingFormView from "./training.form.view";

export default function TrainingFormComponent({ modalRef, editData, isEdit }: TTrainingFormComponentSchema) {
  const formRef = useRef<TUiFormRef<TTrainingSchema>>(null);
  const trainingMutation = useMutation({
    mutationKey: isEdit ? ["training-update"] : ["training-create"],
    mutationFn: async (data: TTrainingSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? TRAINING_LIST.UPDATE(editData?.trainingId?.toString() ?? "0") : TRAINING_LIST.CREATE,
        data,
      });
      await wait();
      return response.data;
    },
    onSuccess: () => {
      formRef.current?.reset();
      modalRef?.current?.modalClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.TRAINING_LIST.key });
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TTrainingSchema> = (value) => {
    trainingMutation.mutate(value);
  };

  return (
    <UiForm
      schema={trainingSchema}
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <TrainingFormView formRef={formRef} modalRef={modalRef} isEdit={isEdit} />
    </UiForm>
  );
}
