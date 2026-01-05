import { BaseDto, IBaseDto } from "./base.dto";

export interface ITrainingsDto extends IBaseDto {
    trainingId: string;
    training: string;
    register: string;
    completion: string;
    incomplete: string;
    status: string;

}


export class CTrainingsDto extends BaseDto implements ITrainingsDto {
    trainingId: string = "";
    training: string = "";
    register: string = "";
    completion: string = "";
    incomplete: string = "";
    status: string = "";

    setAdditionalKey(): void {  // 
    }

}
