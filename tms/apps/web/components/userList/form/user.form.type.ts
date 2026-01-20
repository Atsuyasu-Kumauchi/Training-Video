import { IUserDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema,
  TFormViewSchema,
  zodArray,
  zodBoolean,
  zodInfer,
  zodNumber,
  zodNumberRequired,
  zodObject,
  zodString,
  zodStringRequired,
} from "@/tmsui";

export type TUserFormComponentSchema = TFormComponentSchema<TUserSchema> & {
  editData?: Partial<IUserDto>;
};

export type TUserListFormViewSchema = TFormViewSchema<TUserListSchema> & {
  editData?: Partial<IUserDto>;
};

export type TUserFormViewSchema = TFormViewSchema<TUserSchema>;

export const userSchema = zodObject({
  username: zodString(),
  email: zodStringRequired(),
  password: zodStringRequired(),
  firstName: zodStringRequired(),
  lastName: zodStringRequired(),
  employeeId: zodStringRequired(),
  roleId: zodNumberRequired(),
  departmentId: zodNumberRequired(),
  isReviewer: zodBoolean(),
  userTagIds: zodArray(zodNumber().transform(Number)),
  joinDate: zodStringRequired(),
});

export type TUserSchema = zodInfer<typeof userSchema>;
export type TUserListSchema = zodInfer<typeof userSchema>;
export const userKeys = Object.keys(userSchema.shape) as (keyof zodInfer<
  typeof userSchema
>)[];

export const initialValues: TUserSchema = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  employeeId: "",
  roleId: 0,
  departmentId: 0,
  isReviewer: false,
  userTagIds: [],
  joinDate: "",
};

export const defaultValues = (
  isEdit?: boolean,
  editData?: Partial<IUserDto>,
): Partial<TUserSchema> => {
  return isEdit
    ? pickFormData(
        editData as unknown as TUserSchema,
        userKeys as (keyof TUserSchema)[],
      )
    : initialValues;
};

export const tag = [
  { label: "Select Tag", value: "" }, //
  { label: "IT", value: "it" },
  { label: "HR", value: "hr" },
  { label: "SALES", value: "sales" },
  { label: "MARKETING", value: "marketing" },
  { label: "OPERATION", value: "operation" },
  { label: "FINANCE", value: "finance" },
];
