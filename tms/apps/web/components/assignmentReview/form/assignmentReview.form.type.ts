import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const assignmentReviewSchema = zodObject({
  user: zodStringRequired(),
  assignmentTitle: zodStringRequired(),
  status: zodStringRequired(),
  submittedDate: zodStringRequired(),
});

export type TAssignmentReviewSchema = zodInfer<typeof assignmentReviewSchema>;

export const initialValues: TAssignmentReviewSchema = {
  user: "",
  assignmentTitle: "",
  status: "",
  submittedDate: "",
};
