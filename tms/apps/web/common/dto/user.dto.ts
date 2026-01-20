import { BaseDto, IBaseDto } from "./base.dto";

export interface IUserDto extends IBaseDto {
  userId: string;
  email: string;
  username: string;
  //   department: string;
  assigned_training: number;
  completed_training: number;
  status: string;
  firstName: string;
  lastName: string;
  joinDate: string;
  department: {
    name: string;
  };
  role: {
    name: string;
  };
  employeeId: string;
}

export class CUserDto extends BaseDto implements IUserDto {
  userId: string = "";
  email: string = "";
  username: string = "";
  //   department: string = "";
  assigned_training: number = 0;
  completed_training: number = 0;
  status: string = "";
  firstName: string = "";
  lastName: string = "";
  joinDate: string = "";
  department: {
    name: string;
  } = {
    name: "",
  };
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
