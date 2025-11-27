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
  { label: "Select Status", value: "value" },
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
