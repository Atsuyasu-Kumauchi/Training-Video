import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const assignmentListSchema = zodObject({
  question: zodStringRequired(),
});

export type TAssignmentListSchema = zodInfer<typeof assignmentListSchema>;

export const initialValues: TAssignmentListSchema = {
  question: "",
};
