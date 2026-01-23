import { BaseDto, IBaseDto } from "../base.dto";
import { CTrainingsUserDto, ITrainingsUserDto } from "../training.dto";

export interface ITrainingVideosDto extends IBaseDto {
    trainingId: number
    name: string
    description: string
    videos: IStudentTrainingVideosDto[]
    deadline: string
    status: boolean
    created: string
    modified: string
    users: ITrainingsUserDto[]
}


export class CTrainingVideosDto extends BaseDto implements ITrainingVideosDto {
    trainingId: number = 0;
    userId: number = 0;
    name: string = "";
    description: string = "";
    videos: CStudentTrainingVideosDto[] = [];
    deadline: string = "";
    status: boolean = false;
    users: CTrainingsUserDto[] = [];

    setAdditionalKey(): void {  // 
    }

}

export interface IStudentTrainingVideosDto extends IBaseDto {
    videoId: number
    name: string
    description: string
    testId: number
    assignmentId: number
    uploadType: string
    videoUrl: string
    fileName: string
    fileDirectory: string
    audienceTags: string[]
    status: boolean
    test: IStudentTrainingVideosTestDto
    videoDuration: number;
    thumbnailUrl: string;
}


export class CStudentTrainingVideosDto extends BaseDto implements IStudentTrainingVideosDto {
    videoId: number = 0
    name: string = ""
    description: string = ""
    testId: number = 0
    assignmentId: number = 0
    uploadType: string = ""
    videoUrl: string = ""
    fileName: string = ""
    fileDirectory: string = ""
    audienceTags: string[] = []
    status: boolean = false
    test: CStudentTrainingVideosTestDto = new CStudentTrainingVideosTestDto()
    videoDuration: number = 0;
    thumbnailUrl: string = "";

    setAdditionalKey(): void {  // 
    }

}
export interface IStudentTrainingVideosTestDto extends IBaseDto {
    testId: number
    name: string
    description: any
    status: boolean
    testQuestions: IStudentTrainingVideosTestQuestionDto[]
}


export class CStudentTrainingVideosTestDto extends BaseDto implements IStudentTrainingVideosTestDto {
    testId: number = 0
    name: string = ""
    description: any = ""
    status: boolean = false
    testQuestions: CStudentTrainingVideosTestQuestionDto[] = []

    setAdditionalKey(): void {  // 
    }

}

export interface IStudentTrainingVideosTestQuestionDto extends IBaseDto {
    testQuestionId: number
    testId: number
    question: string
    correctOption: number
    options: string[]
}


export class CStudentTrainingVideosTestQuestionDto extends BaseDto implements IStudentTrainingVideosTestQuestionDto {
    testQuestionId: number = 0
    testId: number = 0
    question: string = ""
    correctOption: number = 0
    options: string[] = []

    setAdditionalKey(): void {  // 
    }

}
