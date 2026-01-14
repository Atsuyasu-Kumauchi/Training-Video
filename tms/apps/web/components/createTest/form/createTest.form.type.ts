import {
  zodArray,
  zodBoolean,
  zodInfer,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";
import z from "zod";

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  description: zodString(),
  status: z.preprocess((val) => val === true || val === "true", zodBoolean()),
  testQuestions: zodArray(
    zodObject({
      question: zodStringRequired(),
      options: zodArray(zodStringRequired()).length(4), // always 4 options
      correctOption: zodStringRequired(), // "A", "B", "C", "D"
    })
  ),
});

export type TCreateTestSchema = zodInfer<typeof createTestSchema>;

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

export const status = [
  { label: "アクティブ", value: true },
  { label: "非アクティブ", value: false },
];
