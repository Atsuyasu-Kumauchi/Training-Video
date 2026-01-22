import { ITagDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodInfer, zodObject, zodString, zodStringRequired } from "@/tmsui";

export type TTagFormComponentSchema = TFormComponentSchema<TTagSchema> & {
  isEdit: boolean;
  editData?: ITagDto;
  isPending?: boolean;
}

export type TTagFormViewSchema = TFormViewSchema<TTagSchema>

export const tagSchema = zodObject({
  name: zodStringRequired(),
  status: zodString(),
});

export type TTagSchema = zodInfer<typeof tagSchema>;

export const tagKeys = Object.keys(tagSchema.shape) as (keyof zodInfer<typeof tagSchema>)[];

export const initialValues = {
  name: "",
  status: "true",
};

export const defaultValues = (isEdit: boolean, editData: ITagDto): Partial<TTagSchema> => {
  return isEdit ? pickFormData(editData as unknown as TTagSchema, tagKeys as (keyof TTagSchema)[]) : initialValues;
}

export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];