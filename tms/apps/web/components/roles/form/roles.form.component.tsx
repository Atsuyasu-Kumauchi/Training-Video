import { IRoleDto, ListQueryConfig, Messages, ROLE } from "@/common";
import { useToast } from "@/hooks";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { defaultValues, rolesSchema, TRolesFormComponentSchema, TRolesSchema } from "./roles.form.type";
import RolesFormView from "./roles.form.view";

export default function RolesFormComponent({ modalRef, isEdit, editData }: TRolesFormComponentSchema) {

  const formRef = useRef<TUiFormRef<TRolesSchema>>(null);
  const { toastError, toastSuccess } = useToast()
  const mutation = useMutation({
    mutationKey: isEdit ? ["roles-update"] : ["roles-create"],
    mutationFn: async (data: TRolesSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? ROLE.UPDATE(editData?.roleId?.toString() ?? "0") : ROLE.CREATE,
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
    onError: () => {
      toastError(Messages.OPERATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.ROLE_LIST.key });
    },

  });

  const onSubmitHandler: TFormHandlerSubmit<TRolesSchema> = (value) => {
    mutation.mutate(value as TRolesSchema);
  };

  return (
    <UiForm
      schema={rolesSchema}
      initialValues={defaultValues(isEdit, editData as IRoleDto)}
      onSubmit={onSubmitHandler}
      ref={formRef}
    >
      <RolesFormView modalRef={modalRef} isPending={mutation.isPending} isEdit={isEdit} />
    </UiForm>
  );
}
