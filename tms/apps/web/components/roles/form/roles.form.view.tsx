import { useLang } from "@/lang";
import { Button, UiFormInput, UiFormSelect } from "@/tmsui";
import { status, TRolesFormViewSchema, TRolesSchema } from "./roles.form.type";

export default function RolesFormView({ modalRef, isPending, isEdit }: TRolesFormViewSchema) {
  const { role } = useLang();

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TRolesSchema>
          name="name"
          label={role.form.roleName}
          placeholder={role.form.roleNamePlaceholder}
        />
      </div>
      <div className="col-span-12">
        <UiFormSelect<TRolesSchema>
          name="status"
          label={role.form.status}
          placeholder={role.form.statusPlaceholder}
          options={status}
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => modalRef?.current?.modalClose()}>
          {role.form.cancel}
        </Button>
        <Button type="submit" disabled={isPending} loading={isPending}>{isEdit ? role.form.updateRole : role.form.subBtn}</Button>
      </div>
    </div>
  );
}
