import { DEPARTMENT, IDepartmentDto, ListQueryConfig } from "@/common";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiBasicModalRef, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  departmentKeys,
  departmentsSchema,
  initialValues,
  TDepartmentsSchema
} from "./departments.form.type";
import DepartmentsFormView from "./departments.form.view";

type DepartmentProps = {
  modalRef: React.RefObject<TUiBasicModalRef>;
  editData?: IDepartmentDto;
}

function pick<T, K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Pick<T, K[number]> {
  return Object.fromEntries(
    keys.map((key) => [key, obj[key]])
  ) as Pick<T, K[number]>;
}




export default function DepartmentsFormComponent({ modalRef, editData }: DepartmentProps) {

  const isEdit = Boolean(editData?.departmentId);
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);
  const mutationKey = isEdit ? ["departments-update"] : ["departments-create"];
  const mutationUrl = isEdit ? DEPARTMENT.UPDATE(editData?.departmentId ?? 0) : DEPARTMENT.CREATE;

  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data: TDepartmentsSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: mutationUrl,
        data: {
          name: data.name,
          status: Boolean(data.status),
        },
      });
      return response.data;
    },
    onSuccess: async () => {
      await wait(500);
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

  const initValues = isEdit
    ? pick(editData, departmentKeys as (keyof typeof editData)[])
    : initialValues;

  return (
    <UiForm
      schema={departmentsSchema}
      initialValues={initValues}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <DepartmentsFormView modalRef={modalRef} isPending={mutation.isPending} />
    </UiForm>
  );
}
