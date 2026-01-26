import { IAssignmentReviewerDto, IUserDto } from "@/common";
import {
  AuthServer,
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
import { useQuery } from "@tanstack/react-query";

export type TUserFormComponentSchema = TFormComponentSchema<TUserSchema> & {
  editData?: Partial<IUserDto>;
};

export type TUserFormViewSchema = TFormViewSchema<TUserSchema> & {
  firstReviewData?: IAssignmentReviewerDto[];
  secondReviewData?: IAssignmentReviewerDto[];
  finalReviewData?: IAssignmentReviewerDto[];
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



// =============== Uitility function ===============
type TReviewFetch = {
  queryKey: string[]
  url: string
}

export const reviewFetch = ({ queryKey, url }: TReviewFetch) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await AuthServer({
        method: "GET",
        url: url,
      });
      return response.data;
    },
  })
}


export const ReviewOptions = (ReviewData: IAssignmentReviewerDto[]) => {
  return ReviewData?.map((item: IAssignmentReviewerDto) => ({
    label: item.firstName + " " + item.lastName,
    value: item.userId,
  }));
}
