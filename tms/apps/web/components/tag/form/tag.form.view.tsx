import { useLang } from "@/lang";
import {
  Button,
  UiFormInput,
  UiFormSelect
} from "@/tmsui";
import { status, TTagFormComponentSchema, TTagSchema } from "./tag.form.type";

export default function TagFormView({ isEdit, modalRef, isPending }: TTagFormComponentSchema) {
  const { tag } = useLang();


  return (
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
        placeholder={tag.form.statusPlaceholder}
      />
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          color="neutral"
          onClick={() => modalRef?.current?.modalClose()}
        >
          {tag.form.cancel}
        </Button>
        <Button type="submit" disabled={isPending} loading={isPending}>{isEdit ? tag.form.updateTags : tag.form.createATag}</Button>
      </div>
    </div>
  );
}
