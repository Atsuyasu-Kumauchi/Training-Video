import { ITagDto, Messages } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodInfer, zodObject, zodStringRequired } from "@/tmsui";
import { z } from "zod";
import { sanitizeSQLInput } from "@/tmsui/zodValidation/string/zodString";

export type TTagFormComponentSchema = TFormComponentSchema<TTagSchema> & {
  isEdit: boolean;
  editData?: ITagDto;
  isPending?: boolean;
}

export type TTagFormViewSchema = TFormViewSchema<TTagSchema>

export const tagSchema = zodObject({
  name: z.coerce
    .string()
    .min(1, { message: Messages.FIELD_REQUIRED }) // This field is required
    .max(20, { message: Messages.TAG_MAX_LENGTH }) // Tag name must be 20 characters or less
    .refine(
      (val) => !/\s/.test(val) && !/　/.test(val), // Check for regular space and Japanese full-width space
      { message: Messages.TAG_NO_SPACES } // Tag name cannot contain spaces, use underscore instead
    )
    .transform(sanitizeSQLInput),
  status: zodStringRequired().transform((value) => value === "true"),
});

export type TTagSchema = zodInfer<typeof tagSchema>;

export const tagKeys = Object.keys(tagSchema.shape) as (keyof zodInfer<typeof tagSchema>)[];

export const initialValues = {
  name: "",
  status: true,
};

export const defaultValues = (isEdit: boolean, editData: ITagDto): Partial<TTagSchema> => {
  return isEdit ? pickFormData(editData as unknown as TTagSchema, tagKeys as (keyof TTagSchema)[]) : initialValues;
}

export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];