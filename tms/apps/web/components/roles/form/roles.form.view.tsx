import { useLang } from "@/lang";
import { Button, UiFormInput, UiFormSelect } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { status, TRolesSchema } from "./roles.form.type";

export default function RolesFormView() {
  const { setIsOpen } = useSettings();
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
          options={status}
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => setIsOpen(false)}>
          {role.form.cancel}
        </Button>
        <Button type="submit">{role.form.subBtn}</Button>
      </div>
    </div>
  );
}
