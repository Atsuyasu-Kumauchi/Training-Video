import { DEPARTMENT } from "@/common";
import { AuthServer, TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  departmentsSchema,
  initialValues,
  TDepartmentsSchema,
} from "./departments.form.type";
import DepartmentsFormView from "./departments.form.view";

export default function DepartmentsFormComponent() {
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);

  const mutation = useMutation({
    mutationKey: ["departments-create"],
    mutationFn: (data: TDepartmentsSchema) => {
      return AuthServer({
        method: "POST",
        url: DEPARTMENT.CREATE,
        data,
      });
    },
    onSuccess: () => {
      formRef.current?.reset();
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TDepartmentsSchema> = (value) => {
    const data = value as TDepartmentsSchema;
    if (data) {
      mutation.mutate({
        name: data.name,
      } as TDepartmentsSchema);
    }
  };

  return (
    <UiForm
      schema={departmentsSchema}
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <DepartmentsFormView />
    </UiForm>
  );
}
