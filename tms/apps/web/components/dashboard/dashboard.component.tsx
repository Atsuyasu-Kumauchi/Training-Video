"use client"
import { TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useRef } from "react";
import { dashboardSchema, initialValues, TDashboardSchema } from "./dashboard.type";
import DashboardView from "./dashboard.view";

export default function DashboardComponent() {

    const formRef = useRef<TUiFormRef<TDashboardSchema>>(null)

    const onSubmit: TFormHandlerSubmit<TDashboardSchema> = (value) => {
        console.log(value);

    }

    return (
        <UiForm
            schema={dashboardSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            ref={formRef}

        >
            <DashboardView />
        </UiForm>
    )
}