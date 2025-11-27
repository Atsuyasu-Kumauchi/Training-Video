import {
  Button,
  Modal,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
  UiFormInput,
  UiFormSelect,
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import {
  departmentsSchema,
  initialValues,
  status,
  TDepartmentsSchema,
} from "./departments.form.type";

export default function DepartmentsFormView() {
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TDepartmentsSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TDepartmentsSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add Department"
    >
      <UiForm
        schema={departmentsSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="px-6 py-8">
          <div className="space-y-4">
            <UiFormInput<TDepartmentsSchema>
              name="name"
              label="Department Name"
              placeholder="Enter department name"
            />

            <UiFormSelect<TDepartmentsSchema>
              name="status"
              label="Status"
              options={status}
            />
            <div className="flex justify-end space-x-3 pt-4">
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
        </div>
      </UiForm>
    </Modal>
  );
}
