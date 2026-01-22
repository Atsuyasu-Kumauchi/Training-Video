import { BaseDto, IBaseDto } from "./base.dto";
import { CDepartmentDto, IDepartmentDto } from "./department.dto";

export interface IUserDto extends IBaseDto {
    userId: string;
    email: string;
    username: string;
    department: IDepartmentDto;
    assigned_training: number;
    completed_training: number;
    status: string
    reviewers: number[]
    firstReview: number
    secondReview: number
    finalReview: number
}


export class CUserDto extends BaseDto implements IUserDto {
    userId: string = "";
    email: string = "";
    username: string = "";
    department: CDepartmentDto = new CDepartmentDto();
    assigned_training: number = 0;
    completed_training: number = 0;
    status: string = "";
    reviewers: number[] = [];
    firstReview: number = 0;
    secondReview: number = 0;
    finalReview: number = 0;

    setAdditionalKey(): void {  // 

    }

}
