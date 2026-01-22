import { IRoleDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export type TRolesFormComponentSchema = TFormComponentSchema<TRolesSchema> & {
  isEdit: boolean;
  editData?: IRoleDto;
}

export type TRolesFormViewSchema = TFormViewSchema<TRolesSchema>

export const rolesSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TRolesSchema = zodInfer<typeof rolesSchema>;
export const rolesKeys = Object.keys(rolesSchema.shape) as (keyof zodInfer<typeof rolesSchema>)[];

export const initialValues: TRolesSchema = {
  name: "",
  status: "true",
};

export const defaultValues = (isEdit: boolean, editData: IRoleDto): Partial<TRolesSchema> => {
  return isEdit ? pickFormData(editData as unknown as TRolesSchema, rolesKeys as (keyof TRolesSchema)[]) : initialValues;
}

// active and inactive
export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];