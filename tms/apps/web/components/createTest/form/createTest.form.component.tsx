"use client";
import { TEST_CREATION_LIST } from "@/common";
import { AuthServer } from "@/tmsui";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useParams, useRouter } from "next/navigation";

import { useRef } from "react";
import {
  createTestSchema,
  initialValues,
  TCreateTestSchema,
} from "./createTest.form.type";
import EditTestFormView from "./editTest.form.view";

export default function CreateTestFormComponent() {
  const navigate = useRouter();
  const formRef = useRef<TUiFormRef<TCreateTestSchema>>(null);
  const { id } = useParams<{ id: string }>();

  const onSubmitHandler: TFormHandlerSubmit<TCreateTestSchema> = async (
    value
  ) => {
    const optionMap: Record<string, number> = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    };
    const payload = {
      testId: Number(id),
      name: value.name,
      description: value.description,
      status: value.status === "Active", // boolean
      testQuestions: value.testQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        correctOption: optionMap[q.correctOption], // 1–4
        testId: Number(id),
      })),
    };
    console.log("FINAL PAYLOAD", payload);

    try {
      const res = await AuthServer({
        method: "PUT",
        url: TEST_CREATION_LIST.UPDATE(id),
        data: payload,
      });
      if (res?.status === 200) {
        console.log("success");
        navigate.push(`/admin/create-test`);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // Updated setFormValues using setValue for each key
  const setFormValues = (values: TCreateTestSchema) => {
    if (!formRef.current) return;

    // Loop through each key and call setValue
    Object.keys(values).forEach((key) => {
      // ...existing code...
      // @ts-expect-error - setValue expects a specific key type, not a dynamic string key
      // ...existing code...
      formRef.current?.setValue(key, values[key]);
    });
  };

  return (
    <UiForm
      schema={createTestSchema}
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      {/* <CreateTestFormView /> */}
      <EditTestFormView setFormValues={setFormValues} />
    </UiForm>
  );
}
