"use client"
import dynamic from "next/dynamic";
const CreateTestComponent = dynamic(() => import("@/components/createTest/createTest.component"), {
    ssr: false,
});

export default function CreateTestPage() {
    return (
        <CreateTestComponent />
    )
}
