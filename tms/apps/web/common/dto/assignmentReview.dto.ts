import { BaseDto, IBaseDto } from "./base.dto";

export interface IAssignmentReviewDto extends IBaseDto {
    user: string;
    assignmentTitle: string;
    status: string;
    submittedDate: string;
}


export class CAssignmentReviewDto extends BaseDto implements IAssignmentReviewDto {
    user: string = "";
    assignmentTitle: string = "";
    status: string = "";
    submittedDate: string = "";

    setAdditionalKey(): void {  // 
    }

}
