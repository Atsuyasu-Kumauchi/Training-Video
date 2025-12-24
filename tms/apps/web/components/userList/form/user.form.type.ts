import { IUserDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema, TFormViewSchema,
  zodArray,
  zodBoolean,
  zodInfer,
  zodNumber,
  zodObject,
  zodString,
  zodStringRequired
} from "@/tmsui";

export type TUserFormComponentSchema = TFormComponentSchema<TUserSchema> & {
  isEdit: boolean;
  editData?: IUserDto;
}

export type TUserFormViewSchema = TFormViewSchema<TUserSchema>

export const userSchema = zodObject({
  username: zodString(),
  email: zodStringRequired(),
  password: zodStringRequired(),
  firstName: zodStringRequired(),
  lastName: zodStringRequired(),
  employeeId: zodStringRequired(),
  roleId: zodStringRequired(),
  departmentId: zodStringRequired(),
  isReviewer: zodBoolean(),
  userTags: zodArray(zodNumber()),
  joinDate: zodStringRequired(),
});

export type TUserSchema = zodInfer<typeof userSchema>;

export const userKeys = Object.keys(userSchema.shape) as (keyof zodInfer<typeof userSchema>)[];


export const initialValues: TUserSchema = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  employeeId: "",
  roleId: "",
  departmentId: "",
  isReviewer: false,
  userTags: [],
  joinDate: "",
};

export const defaultValues = (isEdit: boolean, editData: IUserDto): Partial<TUserSchema> => {
  return isEdit ? pickFormData(editData as unknown as TUserSchema, userKeys as (keyof TUserSchema)[]) : initialValues;
}

export const tag = [
  { label: "Select Tag", value: "" }, //
  { label: "IT", value: "it" },
  { label: "HR", value: "hr" },
  { label: "SALES", value: "sales" },
  { label: "MARKETING", value: "marketing" },
  { label: "OPERATION", value: "operation" },
  { label: "FINANCE", value: "finance" },
];
