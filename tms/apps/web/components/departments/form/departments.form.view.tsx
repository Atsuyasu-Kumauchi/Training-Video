import { StaticData } from "@/common";
import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect } from "@/tmsui";
import { TDepartmentsFormViewSchema, TDepartmentsSchema } from "./departments.form.type";

export default function DepartmentsFormView({ isEdit, modalRef, isPending }: TDepartmentsFormViewSchema) {
  const { department } = useLang();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TDepartmentsSchema>
          name="name"
          label={department.form.departmentName}
          placeholder={department.form.departmentNamePlaceholder}
          required
        />
      </div>
      <div className="col-span-12">
        <UiFormSelect<TDepartmentsSchema>
          name="status"
          label={department.form.status}
          options={StaticData.status}
          placeholder={department.form.status}
          required
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => modalRef?.current?.modalClose()}>
          {department.form.cancel}
        </Button>
        <Button type="submit" disabled={isPending} loading={isPending}> {isEdit ? department.form.updateBtn : department.form.subBtn}</Button>
      </div>
    </div>
  );
}
