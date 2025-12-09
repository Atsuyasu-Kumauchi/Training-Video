"use client"
import AssignmentFormComponent from "./form/assignmentList.form.component";
import AssignmentListComponent from "./list/assignmentList.list.component";
import AssignmentListHeader from "./list/assignmentList.list.header";

export default function AssignmentListController() {
    return (
        <div className="px-6 py-8">
            <AssignmentListHeader />
            <AssignmentListComponent />
            <AssignmentFormComponent />
        </div>
    )
}