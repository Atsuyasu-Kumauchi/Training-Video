import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const rolesSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TRolesSchema = zodInfer<typeof rolesSchema>;

export const initialValues = {
  name: "",
  status: "",
};

export const status = [
  { label: "ステータスを選択", value: "value" },
  { label: "有効", value: "1" },
  { label: "無効", value: "0" },
];
