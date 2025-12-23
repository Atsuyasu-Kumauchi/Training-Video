import { zodArray, zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  category: zodStringRequired(),
  explanation: zodStringRequired(),
  status: zodStringRequired(),
  questions: zodArray(zodObject({
    questionText: zodStringRequired(),
    questionType: zodStringRequired(),
  })),
});

export type TCreateTestSchema = zodInfer<typeof createTestSchema>;

export const initialValues: TCreateTestSchema = {
  name: "",
  category: "",
  status: "",
  explanation: "",
  questions: [
    {
      questionText: "",
      questionType: "",
    },
  ],
};
