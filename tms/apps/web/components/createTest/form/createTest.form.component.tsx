"use client";
import { ListQueryConfig, TEST_CREATION_LIST } from "@/common";
import {
  AuthServer,
  queryClient,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
} from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import {
  createTestSchema,
  initialValues,
  TCreateTestSchema,
} from "./createTest.form.type";
import EditTestFormView from "./editTest.form.view";

export default function CreateTestFormComponent() {
  const router = useRouter();
  const formRef = useRef<TUiFormRef<TCreateTestSchema>>(null);
  const { id } = useParams<{ id: string }>();

  const testMutation = useMutation({
    mutationKey: ["test-update", id],
    mutationFn: async (value: TCreateTestSchema) => {
      const optionMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };
      const payload = {
        testId: Number(id),
        name: value.name,
        description: value.description,
        status: value.status,
        testQuestions: value.testQuestions.map((q) => ({
          question: q.question,
          options: q.options,
          correctOption: optionMap[q.correctOption],
          testId: Number(id),
        })),
      };

      return AuthServer({
        method: "PUT",
        url: TEST_CREATION_LIST.UPDATE(id),
        data: payload,
      });
    },
    onSuccess: async () => {
      formRef.current?.reset();
      router.push("/admin/create-test");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ListQueryConfig.TEST_CREATION_LIST.key,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TCreateTestSchema> = (value) => {
    testMutation.mutate(value);
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
