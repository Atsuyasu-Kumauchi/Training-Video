import { BaseDto, IBaseDto } from "./base.dto";

export interface ITrainingsDto extends IBaseDto {
    trainingId: number;
    name: string;
    description: string;
    videos: number[];
    deadline: string;
    status: boolean;
    users: ITrainingsUserDto[];
    usersIds: number[]
}

export class CTrainingsDto extends BaseDto implements ITrainingsDto {
    trainingId: number = 0;
    userId: number = 0;
    name: string = "";
    description: string = "";
    videos: number[] = [];
    deadline: string = "";
    status: boolean = false;
    users: CTrainingsUserDto[] = [];
    usersIds: number[] = [];

    setAdditionalKey(): void {  // 
        this.usersIds = this.users.map((user) => user.userId);
    }

}


export interface ITrainingVideosStatus {
    status: string;
    watchDuration: number;
}
export class CTrainingVideosStatus implements ITrainingVideosStatus {
    status: string = "";
    watchDuration: number = 0;
}

export interface ITrainingsUserDto extends IBaseDto {
    userId: number;
    progress: ITrainingVideosStatus[];
    videoProgressMap?: { [key: number]: ITrainingVideosStatus };
}


export class CTrainingsUserDto extends BaseDto implements ITrainingsUserDto {
    userId: number = 0;
    progress: CTrainingVideosStatus[] = [];
    videoProgressMap?: { [key: number]: CTrainingVideosStatus } = {};

    setAdditionalKey(): void {  // 

    }

}


export enum TrainingVideosStatusEnum {
    NotStarted = 'NOT_STARTED',
    InProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
}