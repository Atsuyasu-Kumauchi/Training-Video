import { BaseDto, IBaseDto } from "../base.dto";
import { CTrainingsUserDto, ITrainingsUserDto } from "../training.dto";

export interface IMyTrainingsDto extends IBaseDto {
    trainingId: number;
    name: string;
    description: string;
    videos: number[];
    deadline: string;
    status: boolean;
    users: ITrainingsUserDto[];

}


export class CMyTrainingsDto extends BaseDto implements IMyTrainingsDto {
    trainingId: number = 0;
    userId: number = 0;
    name: string = "";
    description: string = "";
    videos: number[] = [];
    deadline: string = "";
    status: boolean = false;
    users: CTrainingsUserDto[] = [];

    setAdditionalKey(): void {  // 
    }

}
