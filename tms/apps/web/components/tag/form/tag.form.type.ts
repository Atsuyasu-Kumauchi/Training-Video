import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const tagSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TTagSchema = zodInfer<typeof tagSchema>;

export const initialValues = {
  name: "",
  status: "",
};



export const status = [
  { label: "すべてのステータス", value: "" },
  { label: "アクティブ", value: "1" },
  { label: "非アクティブ", value: "0" },
];