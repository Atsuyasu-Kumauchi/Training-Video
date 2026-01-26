import { DEPARTMENT, IDepartmentDto, ListQueryConfig, Messages } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  defaultValues,
  departmentsSchema,
  TDepartmentsFormComponentSchema,
  TDepartmentsSchema
} from "./departments.form.type";
import DepartmentsFormView from "./departments.form.view";


export default function DepartmentsFormComponent({ modalRef, editData, isEdit }: TDepartmentsFormComponentSchema) {
  const { toastError, toastSuccess } = useToast()
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);

  const mutation = useMutation({
    mutationKey: isEdit ? ["departments-update"] : ["departments-create"],
    mutationFn: async (data: TDepartmentsSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? DEPARTMENT.UPDATE(editData?.departmentId ?? 0) : DEPARTMENT.CREATE,
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
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.DEPARTMENT_LIST.key });
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TDepartmentsSchema> = (value) => {
    mutation.mutate(value);
  };

  return (
    <UiForm
      schema={departmentsSchema}
      initialValues={defaultValues(isEdit, editData as IDepartmentDto)}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <DepartmentsFormView isEdit={isEdit} modalRef={modalRef} isPending={mutation.isPending} />
    </UiForm>
  );
}
