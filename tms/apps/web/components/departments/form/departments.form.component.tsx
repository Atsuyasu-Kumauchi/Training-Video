import { DEPARTMENT, IDepartmentDto, ListQueryConfig } from "@/common";
import { AuthServer, TFormHandlerSubmit, TUiBasicModalRef, TUiFormRef, UiForm } from "@/tmsui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import {
  departmentsSchema,
  TDepartmentsSchema
} from "./departments.form.type";
import DepartmentsFormView from "./departments.form.view";

type DepartmentProps = {
  modalRef: React.RefObject<TUiBasicModalRef>;
  editData?: IDepartmentDto;
}

export default function DepartmentsFormComponent({ modalRef, editData }: DepartmentProps) {
  const isEdit = Boolean(editData?.departmentId);
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);
  const queryClient = useQueryClient();

  const mutationKey = isEdit ? ["departments-update"] : ["departments-create"];
  const mutationUrl = isEdit ? DEPARTMENT.UPDATE(editData?.departmentId ?? 0) : DEPARTMENT.CREATE;

  const mutation = useMutation({
    mutationKey,
    mutationFn: (data: TDepartmentsSchema) => {
      return AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: mutationUrl,
        data: {
          name: data.name,
          status: Boolean(data.status),
        },
      });
    },
    onSuccess: () => {
      formRef.current?.reset();
      modalRef.current?.modalClose();
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.DEPARTMENT_LIST.key });
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TDepartmentsSchema> = (value) => {
    const data = value as TDepartmentsSchema;
    if (data) {
      mutation.mutate({
        name: data.name,
        status: data.status as string,
      } as TDepartmentsSchema);
    }
  };

  return (
    <UiForm
      schema={departmentsSchema}
      initialValues={isEdit ? {
        name: editData?.name ?? "",
        status: editData?.status ? "true" : "false",
      } : {
        name: "",
        status: "",
      } as TDepartmentsSchema}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <DepartmentsFormView />
    </UiForm>
  );
}
