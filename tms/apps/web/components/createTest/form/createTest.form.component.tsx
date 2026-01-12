"use client";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useRef } from "react";
import {
  createTestSchema,
  initialValues,
  TCreateTestSchema,
} from "./createTest.form.type";
import EditTestFormView from "./editTest.form.view";

export default function CreateTestFormComponent() {
  const formRef = useRef<TUiFormRef<TCreateTestSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TCreateTestSchema> = (value) => {
    console.log(value);
  };

  return (
    <UiForm
      schema={createTestSchema}
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      {/* <CreateTestFormView /> */}
      <EditTestFormView />
    </UiForm>
  );
}
