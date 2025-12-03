import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { status, TDepartmentsSchema } from "./departments.form.type";

export default function DepartmentsFormView() {
  const { setIsOpen } = useSettings();
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
          options={status}
          required
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button type="button" color="neutral" onClick={() => setIsOpen(false)}>
          {department.form.cancel}
        </Button>
        <Button type="submit"> {department.form.subBtn}</Button>
      </div>
    </div>
  );
}
