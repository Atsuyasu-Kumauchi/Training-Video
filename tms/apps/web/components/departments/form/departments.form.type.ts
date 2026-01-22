import { IDepartmentDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodInfer, zodObject, zodStringRequired } from "@/tmsui";


export type TDepartmentsFormComponentSchema = TFormComponentSchema<TDepartmentsSchema> & {
  editData?: Partial<IDepartmentDto>;
}

export type TDepartmentsFormViewSchema = TFormViewSchema<TDepartmentsSchema>

export const departmentsSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TDepartmentsSchema = zodInfer<typeof departmentsSchema>;
export const departmentKeys = Object.keys(departmentsSchema.shape) as (keyof zodInfer<typeof departmentsSchema>)[];

export const initialValues = {
  name: "",
  status: "true",
};


export const defaultValues = (isEdit?: boolean, editData?: Partial<IDepartmentDto>): Partial<TDepartmentsSchema> => {
  return isEdit ? pickFormData(editData as unknown as TDepartmentsSchema, departmentKeys as (keyof TDepartmentsSchema)[]) : initialValues;
}

// active and inactive
export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];
