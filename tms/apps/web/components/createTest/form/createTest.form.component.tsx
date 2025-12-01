import { useLang } from "@/lang";
import { useSettings } from "@/tmsui/store";
import { Modal } from "@/tmsui/ui/basic/modal";
import { UiForm } from "@/tmsui/ui/Form/Form";
import { TFormHandlerSubmit, TUiFormRef } from "@/tmsui/ui/Form/form.type";
import { useRef } from "react";
import { createTestSchema, initialValues, TCreateTestSchema } from "./createTest.form.type";
import CreateTestFormView from "./createTest.form.view";

export default function CreateTestFormComponent() {
  const { testCreation } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TCreateTestSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TCreateTestSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={testCreation.form.test}
    >
      <UiForm
        schema={createTestSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <CreateTestFormView />
      </UiForm>
    </Modal>
  )
}
