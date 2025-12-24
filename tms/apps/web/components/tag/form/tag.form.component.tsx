import { ITagDto, ListQueryConfig, TAG } from "@/common";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { defaultValues, tagSchema, TTagFormComponentSchema, TTagSchema } from "./tag.form.type";
import TagFormView from "./tag.form.view";

export default function TagFormComponent({ isEdit, editData, modalRef }: TTagFormComponentSchema) {

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
