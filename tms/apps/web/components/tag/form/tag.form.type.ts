import { zodInfer, zodObject, zodString, zodStringRequired } from "@/tmsui";

export const userGroupsSchema = zodObject({
  name: zodStringRequired(),
  description: zodString(),
  department: zodString(),
  members: zodString(),
  status: zodString(),
});

export type TUserGroupsSchema = zodInfer<typeof userGroupsSchema>;

export const initialValues = {
  name: "",
  description: "",
  department: "",
  members: "",
  status: "",
};

export const departments = [
  { label: "Select Department", value: "value" },
  { label: "Human Resources", value: "human_resources" },
  { label: "Finance", value: "finance" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "customer_support" },
];

export const members = [
  { label: "Select members...", value: "value" },
  { label: "Alice Johnson", value: "alice_johnson" },
  { label: "Bob Smith", value: "bob_smith" },
  { label: "Charlie Brown", value: "charlie_brown" },
  { label: "Diana Prince", value: "diana_prince" },
];

export const status = [
  { label: "Select Status", value: "value" },
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
