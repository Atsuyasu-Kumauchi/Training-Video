import { BaseDto, IBaseDto } from "./base.dto";

export interface IAssignmentListDto extends IBaseDto {
    name: string;
    question: string;
    assignmentId: number;
}


export class CAssignmentListDto extends BaseDto implements IAssignmentListDto {
    name: string = "";
    question: string = "";
    assignmentId: number = 0;

    setAdditionalKey(): void {  // 
    }

}


export interface IAssignmentReviewerDto extends IBaseDto {
    userId: number;
    firstName: string;
    lastName: string;
    roleName: string;
    roleId: number;
}

export class CAssignmentReviewerDto extends BaseDto implements IAssignmentReviewerDto {
    userId: number = 0;
    firstName: string = "";
    lastName: string = "";
    roleName: string = "";
    roleId: number = 0;

    setAdditionalKey(): void {  // 
    }

}

export enum ERoleName {
    DIRECT_MANAGER = "direct manager",
    SENIOR_MANAGER = "senior manager",
    EMPOWERMENT = "empowerment",
}
