import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const departmentsSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TDepartmentsSchema = zodInfer<typeof departmentsSchema>;

export const initialValues = {
  name: "",
  status: "",
};

export const status = [
  { label: "Select Status", value: "" },
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];
