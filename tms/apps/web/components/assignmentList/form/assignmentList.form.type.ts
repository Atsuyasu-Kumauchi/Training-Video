import { IAssignmentListDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export type TAssignmentListFormComponentSchema = TFormComponentSchema<TAssignmentListSchema> & {
  editData?: IAssignmentListDto;
}

export type TAssignmentListFormViewSchema = TFormViewSchema<TAssignmentListSchema>

export const assignmentListSchema = zodObject({
  name: zodStringRequired(),
  question: zodStringRequired(),
});

export type TAssignmentListSchema = zodInfer<typeof assignmentListSchema>;
export const assignmentListKeys = Object.keys(assignmentListSchema.shape) as (keyof zodInfer<typeof assignmentListSchema>)[];

export const initialValues: TAssignmentListSchema = {
  name: "",
  question: "",
};

export const defaultValues = (isEdit?: boolean, editData?: IAssignmentListDto): Partial<TAssignmentListSchema> => {
  return isEdit ? pickFormData(editData as unknown as TAssignmentListSchema, assignmentListKeys as (keyof TAssignmentListSchema)[]) : initialValues;
}
