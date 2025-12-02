import { BaseDto, IBaseDto } from "./base.dto";

export interface IAssignmentListDto extends IBaseDto {
    question: string;
}


export class CAssignmentListDto extends BaseDto implements IAssignmentListDto {
    question: string = "";

    setAdditionalKey(): void {  // 
    }

}
