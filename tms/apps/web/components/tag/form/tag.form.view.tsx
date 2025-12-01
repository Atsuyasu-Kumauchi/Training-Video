import { useLang } from "@/lang";
import {
  Button,
  Modal,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
  UiFormInput,
  UiFormSelect
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import {
  initialValues,
  status,
  tagSchema,
  TTagSchema
} from "./tag.form.type";

export default function TagFormView() {
  const { tag } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TTagSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TTagSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={tag.form.title}
    >
      <UiForm
        schema={tagSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="space-y-4">
          <UiFormInput<TTagSchema>
            name="name"
            label={tag.form.tagName}
            placeholder={tag.form.tagNamePlaceholder}
            required
          />
          <UiFormSelect<TTagSchema>
            name="status"
            label={tag.form.status}
            options={status}
            required
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              color="neutral"
              onClick={() => setIsOpen(false)}
            >
              {tag.form.cancel}
            </Button>
            <Button type="submit">{tag.form.createATag}</Button>
          </div>
        </div>
      </UiForm>
    </Modal>
  );
}
