import { TUiBasicModalRef, zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export type TDepartmentsFormViewProps = {
  modalRef: React.RefObject<TUiBasicModalRef>;
  isPending: boolean;
}

export const departmentsSchema = zodObject({
  name: zodStringRequired(),
  status: zodStringRequired(),
});

export type TDepartmentsSchema = zodInfer<typeof departmentsSchema>;

export const departmentKeys = Object.keys( departmentsSchema.shape ) as (keyof zodInfer<typeof departmentsSchema>)[];

export const initialValues = {
  name: "",
  status: "",
};

// active and inactive
export const status = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];
