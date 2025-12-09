import { useSettings } from "@/tmsui/store";
import { Modal } from "@/tmsui/ui/basic/modal";
import AssignmentReviewFormView from "./assignmentReview.form.view";

export default function AssignmentReviewFormComponent() {
  const { isOpen, setIsOpen } = useSettings();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Assignment Review"
    >
      <AssignmentReviewFormView />
    </Modal>
  )
}
