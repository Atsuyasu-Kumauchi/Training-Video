"use client";
import { ListQueryConfig, Messages, TEST_CREATION_LIST } from "@/common";
import { useToast } from "@/hooks";
import {
  AuthServer,
  onErrorType,
  queryClient,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
  wait
} from "@/tmsui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { createTestSchema, defaultValues, TCreateTestSchema } from "./createTest.form.type";
import EditTestFormView from "./editTest.form.view";

export default function CreateTestFormComponent() {
  const { toastError, toastSuccess } = useToast()
  const router = useRouter();
  const formRef = useRef<TUiFormRef<TCreateTestSchema>>(null);
  const { id } = useParams<{ id: string }>();

  const { data: testEditData, isLoading, isFetching } = useQuery({
    queryKey: ["createTest-edit", id],
    queryFn: async () => {
      const response = AuthServer({
        method: "GET",
        url: TEST_CREATION_LIST.FIND_BY_ID(id),
      });
      await wait();
      return response;
    },
    refetchOnMount: 'always', // Always fetch when component appears
    refetchOnWindowFocus: false, // Do not fetch when user switches tabs


  });

  const testEditDataValues = {
    name: testEditData?.data?.name,
    description: testEditData?.data?.description,
    status: testEditData?.data?.status,
    testQuestions: testEditData?.data?.testQuestions?.map((item: any) => {
      return {
        question: item.question,
        options: item.options,
        correctOption: item.correctOption,
      }
    })
  }

  const testMutation = useMutation({
    mutationKey: ["test-update", id],
    mutationFn: async (value: TCreateTestSchema) => {
      // const optionMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };
      // const payload = {
      //   testId: Number(id),
      //   name: value.name,
      //   description: value.description,
      //   status: value.status,
      //   testQuestions: value.testQuestions.map((q) => ({
      //     question: q.question,
      //     options: q.options,
      //     correctOption: optionMap[q.correctOption],
      //     testId: Number(id),
      //   })),
      // };

      return AuthServer({
        method: "PUT",
        url: TEST_CREATION_LIST.UPDATE(id),
        data: value,
      });
    },
    onSuccess: async () => {
      formRef.current?.reset();
      router.push("/admin/create-test");
      toastSuccess(Messages.OPERATION_SUCCESS)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ListQueryConfig.TEST_CREATION_LIST.key,
      });
    },
    onError: (error: onErrorType) => {
      toastError(error.error.response?.data?.message || Messages.OPERATION_FAILED)
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TCreateTestSchema> = (value) => {
    testMutation.mutate(value);
  };

  if (isLoading || isFetching) return <div className="flex items-center justify-center h-screen">Loading...</div>

  return (
    <UiForm
      schema={createTestSchema}
      initialValues={defaultValues(true, testEditDataValues)}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <EditTestFormView
        isEdit={true}
        formRef={formRef}
        isPending={testMutation.isPending}
      />
    </UiForm>
  );
}
