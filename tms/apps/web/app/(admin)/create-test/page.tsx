"use client"
import dynamic from "next/dynamic";
const CreateTestController = dynamic(() => import("@/components/createTest/createTest.controller"));

export default function CreateTestPage() {
    return (
        <CreateTestController />
    )
}
