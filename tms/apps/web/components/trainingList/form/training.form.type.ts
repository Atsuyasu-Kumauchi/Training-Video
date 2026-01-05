import { ITrainingsDto } from "@/common";
import {
  TFormComponentSchema,
  TFormViewSchema,
  zodArray,
  zodBoolean,
  zodInfer,
  zodNumberRequired,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";

export type TTrainingFormComponentSchema = TFormComponentSchema<TTrainingSchema> & {
  editData?: Partial<ITrainingsDto>;
}

export type TTrainingFormViewSchema = TFormViewSchema<TTrainingSchema>

export const trainingSchema = zodObject({
  name: zodStringRequired(),
  desription: zodString(),
  videos: zodArray(zodNumberRequired()),
  users: zodArray(zodNumberRequired()),
  deadline: zodString(),
  status: zodBoolean(),
});


export type TTrainingSchema = zodInfer<typeof trainingSchema>;

export const initialValues = {
  name: "",
  desription: "",
  videos: [],
  users: [],
  deadline: "",
  status: true,
};

export const videos = [
  { label: "Select videos", value: "value" },
  { label: "Introduction to JavaScript", value: "introduction_to_javaScript" },
  { label: "Advance JavaScript Concept", value: "advance_javaScript_concept" },
  { label: "React Basic", value: "react_basic" },
  { label: "React Hooks", value: "react_hooks" },
];

export const members = [
  { label: "Select members...", value: "value" },
  { label: "Alice Johnson", value: "alice_johnson" },
  { label: "Bob Smith", value: "bob_smith" },
  { label: "Charlie Brown", value: "charlie_brown" },
  { label: "Diana Prince", value: "diana_prince" },
];

export const tagName = [
  { label: "IT", value: "IT" },
  { label: "HR", value: "HR" },
  { label: "SALES ", value: "SALES" },
  { label: "MARKETING", value: "MARKETING" },
  { label: "OPERATIONS", value: "OPERATIONS" },
  { label: "FINANCE", value: "FINANCE" },
];

export const status = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];
