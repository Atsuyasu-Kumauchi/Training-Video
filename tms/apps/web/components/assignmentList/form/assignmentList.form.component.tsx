import { ASSIGNMENT_LIST, ListQueryConfig, Messages } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, queryClient, wait } from "@/tmsui";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  assignmentListSchema,
  defaultValues,
  TAssignmentListFormComponentSchema,
  TAssignmentListSchema
} from "./assignmentList.form.type";
import AssignmentListFormView from "./assignmentList.form.view";

export default function AssignmentListFormComponent({ isEdit, editData, modalRef }: TAssignmentListFormComponentSchema) {
  const { toastError, toastSuccess } = useToast()
  const formRef = useRef<TUiFormRef<TAssignmentListSchema>>(null);

  const mutation = useMutation({
    mutationKey: isEdit ? ["assignment-list-update"] : ["assignment-list-create"],
    mutationFn: async (data: TAssignmentListSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? ASSIGNMENT_LIST.UPDATE(editData?.assignmentId ?? 0) : ASSIGNMENT_LIST.CREATE,
        data
      });
      await wait();
      return response.data;
    },
    onSuccess: async () => {
      formRef.current?.reset();
      modalRef?.current?.modalClose();
      toastSuccess(Messages.OPERATION_SUCCESS);
    },
    onError: () => {
      toastError(Messages.OPERATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.ASSIGNMENT_LIST.key });
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TAssignmentListSchema> = (value) => {
    mutation.mutate(value);
  };

  return (
    <UiForm
      schema={assignmentListSchema}
      initialValues={defaultValues(isEdit, editData)}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <AssignmentListFormView isEdit={isEdit} modalRef={modalRef} isPending={mutation.isPending} />
    </UiForm>
  );
}
