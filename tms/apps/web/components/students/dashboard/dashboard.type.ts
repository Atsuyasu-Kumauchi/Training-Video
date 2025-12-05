import { zodArray, zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const dashboardSchema = zodObject({
    name: zodStringRequired(),
    department: zodStringRequired(),
    tag: zodArray(zodObject({
        value: zodStringRequired(),
        label: zodStringRequired(),
    })).min(1, "This filed is required"),
    textarea: zodStringRequired(),
    checkbox: zodStringRequired(),
    filedArray: zodArray(zodObject({
        value: zodStringRequired(),
        label: zodStringRequired(),
    })).min(1, "This filed is required"),

})


export type TDashboardSchema = zodInfer<typeof dashboardSchema>


export const initialValues = {
    name: "",
    department: "",
    tag: [],
    textarea: "Hello bangladesh",
    checkbox: "",
    filedArray: [{ label: "", value: "" }]
}