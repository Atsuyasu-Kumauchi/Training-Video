import { ITagDto, ListQueryConfig, Messages, TAG } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";
import { defaultValues, tagSchema, TTagFormComponentSchema, TTagSchema } from "./tag.form.type";
import TagFormView from "./tag.form.view";

export default function TagFormComponent({ isEdit, editData, modalRef }: TTagFormComponentSchema) {
  const { toastSuccess } = useToast();
  const formRef = useRef<TUiFormRef<TTagSchema>>(null);
  const tagMutation = useMutation({
    mutationKey: isEdit ? ["tag-update"] : ["tag-create"],
    mutationFn: async (data: TTagSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? TAG.UPDATE(editData?.tagId?.toString() ?? "0") : TAG.CREATE,
        data,
      });
      await wait();
      return response.data;
    },
    onSuccess: () => {
      formRef.current?.reset();
      modalRef?.current?.modalClose();
      toastSuccess(Messages.OPERATION_SUCCESS);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message ?? Messages.ERROR_OCCURRED; // Error occurred
      // Set error on the name field since duplicate tag error is related to the tag name
      formRef.current?.setError("name", {
        type: "server",
        message: errorMessage,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.TAG_LIST.key });
    },
  });

  const onSubmitHandler: TFormHandlerSubmit<TTagSchema> = (value) => {
    tagMutation.mutate(value as TTagSchema);
  };

  return (
    <UiForm
      schema={tagSchema}
      initialValues={defaultValues(isEdit, editData as ITagDto)}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <TagFormView isEdit={isEdit} editData={editData} modalRef={modalRef} isPending={tagMutation.isPending} />
    </UiForm>
  )
}
