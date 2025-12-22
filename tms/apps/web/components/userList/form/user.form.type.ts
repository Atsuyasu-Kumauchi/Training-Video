import { IUserDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema, TFormViewSchema,
  zodInfer,
  zodObject,
  zodStringRequired
} from "@/tmsui";

export type TUserFormComponentSchema = TFormComponentSchema<TUserSchema> & {
  isEdit: boolean;
  editData?: IUserDto;
}

export type TUserFormViewSchema = TFormViewSchema<TUserSchema>  

export const userSchema = zodObject({
  username: zodStringRequired(),
  email: zodStringRequired(),
  password: zodStringRequired(),
  // lastName: zodStringRequired(),
  // givenName: zodStringRequired(),
  // email: zodStringRequired(),
  // employeeId: zodStringRequired(),
  // department: zodStringRequired(),
  // role: zodStringRequired(),
  // dateOfHire: zodStringRequired(),
  // tag: zodArray(
  //   zodObject({
  //     value: zodStringRequired(),
  //     label: zodStringRequired(),
  //   })
  // ).min(1, "This filed is required"),
  // firstReview: zodStringRequired(),
  // secondReview: zodStringRequired(),
  // finalReview: zodStringRequired(),
  // password: zodString(),
  // checkbox: zodStringRequired(),
});

export type TUserSchema = zodInfer<typeof userSchema>;

export const userKeys = Object.keys( userSchema.shape ) as (keyof zodInfer<typeof userSchema>)[];


export const initialValues: TUserSchema = {
  username: "",
  email: "",
  password: "",
  // lastName: "",
  // givenName: "",
  // email: "",
  // employeeId: "",
  // department: "",
  // role: "",
  // dateOfHire: "",
  // tag: [],
  // firstReview: "",
  // secondReview: "",
  // finalReview: "",
  // password: "",
  // checkbox: "",
};

export const defaultValues = (isEdit: boolean, editData: IUserDto): Partial<TUserSchema> => {
  return isEdit ? pickFormData(editData as unknown as TUserSchema, userKeys as (keyof TUserSchema)[]) : initialValues;
}

export const department = [
  { label: "部門を選択", value: "Draft" }, //Select a department
  { label: "IT Department", value: "IT Department" },
  { label: "HR Department", value: "HR Department" },
  { label: "Finance Department", value: "Finance Department" },
  { label: "Marketing Department", value: "Marketing Department" },
  { label: "Sales Department", value: "Sales Department" },
  { label: "Operations Department", value: "Operations Department" },
];
export const role = [
  { label: "役割を選択", value: "Draft" }, //Select a role
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Analyst", value: "Analyst" },
  { label: "Specialist", value: "Specialist" },
  { label: "Coordinator", value: "Coordinator" },
  { label: "Student", value: "Student" },
];
export const tag = [
  { label: "Select Tag", value: "" }, //
  { label: "IT", value: "it" },
  { label: "HR", value: "hr" },
  { label: "SALES", value: "sales" },
  { label: "MARKETING", value: "marketing" },
  { label: "OPERATION", value: "operation" },
  { label: "FINANCE", value: "finance" },
];
