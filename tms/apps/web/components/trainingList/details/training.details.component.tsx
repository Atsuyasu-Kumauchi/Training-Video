import { TTrainingFormComponentSchema } from "../form/training.form.type";
import TrainingDetailsView from "./training.details.view";

export default function TrainingDetailsComponent(
  props: TTrainingFormComponentSchema,
) {
  return <TrainingDetailsView {...props} />;
}
