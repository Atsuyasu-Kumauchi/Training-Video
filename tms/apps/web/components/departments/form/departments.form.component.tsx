import useLang from "@/lang";
import { TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import {
  departmentsSchema,
  initialValues,
  TDepartmentsSchema,
} from "./departments.form.type";
import DepartmentsFormView from "./departments.form.view";

export default function DepartmentsFormComponent() {
  const { department } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TDepartmentsSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
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
