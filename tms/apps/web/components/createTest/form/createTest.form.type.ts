import {
  zodArray,
  zodInfer,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  explanation: zodString(),
  status: zodStringRequired(),
  questions: zodArray(
    zodObject({
      questionText: zodStringRequired(),
      questionType: zodStringRequired(),
    })
  ),
});

export type TCreateTestSchema = zodInfer<typeof createTestSchema>;

export const initialValues: TCreateTestSchema = {
  name: "",
  status: "",
  explanation: "",
  questions: [
    {
      questionText: "",
      questionType: "",
    },
  ],
};
