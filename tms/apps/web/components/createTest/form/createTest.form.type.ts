import { ITestCreationDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema,
  TFormViewSchema,
  zodArray,
  zodBoolean,
  zodInfer,
  zodObject,
  zodStringRequired
} from "@/tmsui";

export type TCreateTestFormComponentSchema = TFormComponentSchema<TCreateTestSchema> & {
  editData?: Partial<ITestCreationDto>;
};

export type TCreateTestFormViewSchema = TFormViewSchema<TCreateTestSchema> & {
  editData?: Partial<ITestCreationDto>;
};

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  description: zodStringRequired(),
  status: zodBoolean(),
  testQuestions: zodArray(
    zodObject({
      question: zodStringRequired(),
      correctOption: zodStringRequired(), // "A", "B", "C", "D"
      options: zodArray(zodStringRequired()).length(4), // always 4 options
    })
  ),
});

export type TCreateTestSchema = zodInfer<typeof createTestSchema>;
export const createTestKeys = Object.keys(createTestSchema.shape) as (keyof zodInfer<typeof createTestSchema>)[];

export const initialValues: TCreateTestSchema = {
  name: "",
  status: true,
  description: "",
  testQuestions: [
    {
      question: "",
      options: ["", "", "", ""], // 4 empty options
      correctOption: "A", // default
    },
  ],
};

export const defaultValues = (isEdit?: boolean, editData?: Partial<ITestCreationDto>): Partial<TCreateTestSchema> => {
  return isEdit ? pickFormData(editData as unknown as TCreateTestSchema, createTestKeys as (keyof TCreateTestSchema)[]) : initialValues;
}


export const status = [
  { label: "アクティブ", value: 'true' },
  { label: "非アクティブ", value: 'false' },
];
