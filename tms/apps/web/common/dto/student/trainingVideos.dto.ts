import { BaseDto, IBaseDto } from "../base.dto";
import { CTrainingsUserDto, ITrainingsUserDto } from "../training.dto";
import { IVideoListDto } from "../videoList.dto";

export interface ITrainingVideosDto extends IBaseDto {
    trainingId: number;
    userId: number;
    name: string;
    description: string;
    videos: IVideoListDto[];
    deadline: string;
    status: boolean;
    users: ITrainingsUserDto[];
}


export class CTrainingVideosDto extends BaseDto implements ITrainingVideosDto {
    trainingId: number = 0;
    userId: number = 0;
    name: string = "";
    description: string = "";
    videos: IVideoListDto[] = [];
    deadline: string = "";
    status: boolean = false;
    users: CTrainingsUserDto[] = [];

    setAdditionalKey(): void {  // 
    }

}
