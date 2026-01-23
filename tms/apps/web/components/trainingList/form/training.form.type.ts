import { ITrainingsDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema,
  TFormViewSchema,
  zodArray,
  zodBoolean,
  zodInfer,
  zodNumberRequired,
  zodObject,
  zodString,
  zodStringRequired
} from "@/tmsui";

export type TTrainingFormComponentSchema = TFormComponentSchema<TTrainingSchema> & {
  editData?: Partial<ITrainingsDto>;
}

export type TTrainingFormViewSchema = TFormViewSchema<TTrainingSchema>

export const trainingSchema = zodObject({
  name: zodStringRequired(),
  description: zodString(),
  videos: zodArray(zodNumberRequired()),
  usersIds: zodArray(zodNumberRequired()),
  deadline: zodString(),
  status: zodBoolean(),
});


export type TTrainingSchema = zodInfer<typeof trainingSchema>;
export const trainingKeys = Object.keys(trainingSchema.shape) as (keyof zodInfer<typeof trainingSchema>)[];

export const initialValues = {
  name: "",
  description: "",
  videos: [],
  usersIds: [],
  deadline: "",
  status: true,
};

export const defaultValues = (isEdit?: boolean, editData?: Partial<ITrainingsDto>): Partial<TTrainingSchema> => {
  return isEdit ? pickFormData(editData as unknown as TTrainingSchema, trainingKeys as (keyof TTrainingSchema)[]) : initialValues;
}

export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];
