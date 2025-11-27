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
  initialValues,
  rolesSchema,
  status,
  TRolesSchema,
} from "./roles.form.type";

export default function RolesFormView() {
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TRolesSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TRolesSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Role">
      <UiForm
        schema={rolesSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="px-6 py-8">
          <div className="space-y-4">
            <UiFormInput<TRolesSchema>
              name="name"
              label="Role Name"
              placeholder="Enter role name"
            />

            <UiFormSelect<TRolesSchema>
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
              <Button type="submit">Add Role</Button>
            </div>
          </div>
        </div>
      </UiForm>
    </Modal>
  );
}
