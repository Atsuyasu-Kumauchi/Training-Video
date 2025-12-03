"use client"
import AssignmentReviewFormComponent from "./form/assignmentReview.form.component";
import AssignmentReviewListComponent from "./list/assignmentReview.list.component";
import AssignmentReviewHeader from "./list/assignmentReview.list.header";

export default function AssignmentReviewController() {
    return (
        <div className="px-6 py-8">
            <AssignmentReviewHeader />
            <AssignmentReviewListComponent />
            <AssignmentReviewFormComponent />
        </div>
    )
}