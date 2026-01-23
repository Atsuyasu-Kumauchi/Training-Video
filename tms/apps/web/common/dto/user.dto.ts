import { BaseDto, IBaseDto } from "./base.dto";
import { CDepartmentDto, IDepartmentDto } from "./department.dto";
import { CTagDto, ITagDto } from "./tag.dto";

export interface IUserDto extends IBaseDto {
  userId: string;
  email: string;
  username: string;
  department: IDepartmentDto;
  tags: ITagDto;
  assigned_training: number;
  completed_training: number;
  status: string;
  reviewers: number[];
  firstReview: number;
  secondReview: number;
  finalReview: number;
  firstName: string;
  lastName: string;
  joinDate: string;
  role: {
    name: string;
  };
  employeeId: string;
}

export class CUserDto extends BaseDto implements IUserDto {
  userId: string = "";
  email: string = "";
  username: string = "";
  department: CDepartmentDto = new CDepartmentDto();
  tags: CTagDto = new CTagDto();
  assigned_training: number = 0;
  completed_training: number = 0;
  status: string = "";
  reviewers: number[] = [];
  firstReview: number = 0;
  secondReview: number = 0;
  finalReview: number = 0;

  firstName: string = "";
  lastName: string = "";
  joinDate: string = "";
  role: {
    name: string;
  } = {
    name: "",
  };
  employeeId: string = "";

  setAdditionalKey(): void {
    //
  }
}
