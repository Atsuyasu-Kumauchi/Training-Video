import {
  Button,
  UiFormInput,
  UiFormSelect
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import {
  status,
  TDepartmentsSchema
} from "./departments.form.type";

export default function DepartmentsFormView() {
  const { setIsOpen } = useSettings();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TDepartmentsSchema>
          name="name"
          label="Department Name"
          placeholder="Enter department name"
          required
        />
      </div>
      <div className="col-span-12">
        <UiFormSelect<TDepartmentsSchema>
          name="status"
          label="Status"
          options={status}
          required
        />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          color="neutral"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </Button>
        <Button type="submit">Add Department</Button>
      </div>
    </div>
  );
}
