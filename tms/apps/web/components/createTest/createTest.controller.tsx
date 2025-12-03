"use client"
import CreateTestListComponent from "./list/createTest.list.component";
import CreateTestListFilter from "./list/createTest.list.filter";
import CreateTestListHeader from "./list/createTest.list.header";

export default function CreateTestController() {
    return (
        <div className="px-6 py-8">
            <CreateTestListHeader />
            <CreateTestListFilter />
            <CreateTestListComponent />
        </div>
    )
}