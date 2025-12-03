import useLang from "@/lang";
import { Modal, TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import { initialValues, rolesSchema, TRolesSchema } from "./roles.form.type";
import RolesFormView from "./roles.form.view";

export default function RolesFormComponent() {
  const { role } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TRolesSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TRolesSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={role.form.title}
    >
      <UiForm
        schema={rolesSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <RolesFormView />
      </UiForm>
    </Modal>
  );
}
