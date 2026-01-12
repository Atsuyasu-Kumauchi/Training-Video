import {
  zodArray,
  zodInfer,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  description: zodString(),
  status: zodStringRequired(),
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
  status: "Draft",
  description: "",
  testQuestions: [
    {
      question: "",
      options: ["", "", "", ""], // 4 empty options
      correctOption: "A", // default
    },
  ],
};
