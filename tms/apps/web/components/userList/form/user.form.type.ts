import { IUserDto } from "@/common";
import {
  pickFormData,
  TFormComponentSchema,
  TFormViewSchema,
  zodArray,
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

export type TUserFormViewSchema = TFormViewSchema<TUserSchema> & {
  firstReviewData?: IUserDto[];
  secondReviewData?: IUserDto[];
  finalReviewData?: IUserDto[];
};

export const userSchema = zodObject({
  username: zodString(),
  email: zodStringRequired(),
  password: zodStringRequired(),
  firstName: zodStringRequired(),
  lastName: zodStringRequired(),
  employeeId: zodStringRequired(),
  roleId: zodNumberRequired(),
  departmentId: zodNumberRequired(),
  userTagIds: zodArray(zodNumber().transform(Number)),
  joinDate: zodStringRequired(),
  firstReview: zodNumber(),
  secondReview: zodNumber(),
  finalReview: zodNumber(),
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
  userTagIds: [],
  joinDate: "",
  firstReview: null,
  secondReview: null,
  finalReview: null,
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

// export const tag = [
//   { label: "Select Tag", value: "" }, //
//   { label: "IT", value: "it" },
//   { label: "HR", value: "hr" },
//   { label: "SALES", value: "sales" },
//   { label: "MARKETING", value: "marketing" },
//   { label: "OPERATION", value: "operation" },
//   { label: "FINANCE", value: "finance" },
// ];
