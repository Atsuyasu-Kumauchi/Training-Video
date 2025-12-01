import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const trainingSchema = zodObject({
  name: zodStringRequired(),
});

export type TTrainingSchema = zodInfer<typeof trainingSchema>;

export const initialValues = {
  name: "",
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

export const status = [
  { label: "Select Status", value: "value" },
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
