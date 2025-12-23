import {
  zodArray,
  zodInfer,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";

export const trainingSchema = zodObject({
  name: zodStringRequired(),
  description: zodString(),
  videos: zodStringRequired(),
  users: zodString(),
  group: zodString(),
  status: zodStringRequired(),
  tag: zodArray(
    zodObject({
      value: zodStringRequired(),
      label: zodStringRequired(),
    })
  ).min(1, "This filed is required"),
});

export type TTrainingSchema = zodInfer<typeof trainingSchema>;

export const initialValues = {
  name: "",
  description: "",
  videos: "",
  users: "",
  group: "",
  status: "",
  tag: [],
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
  { label: "ステータスを選択", value: "value" }, //Select a status
  { label: "アクティブ", value: "1" }, //active
  { label: "下書き", value: "0" }, //draft
  { label: "アーカイブ", value: "0" }, //archive
];
