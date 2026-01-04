import { BaseDto, IBaseDto } from "./base.dto";

export interface IVideoListDto extends IBaseDto {
    videoId: number;
    name: string;
    description: string;
    testId: number;
    assignmentId: number;
    uploadType: 'youtube' | 'file';
    videoUrl: string;
    fileName: string;
    fileDirectory: string;
    audienceTags: string[];
    status: boolean;
    created: string;
    modified: string;
    playbackTime: string
}


export class CVideoListDto extends BaseDto implements IVideoListDto {
    videoId!: number;
    name!: string;
    description!: string;
    testId!: number;
    assignmentId!: number;
    uploadType!: 'youtube' | 'file';
    videoUrl!: string;
    fileName!: string;
    fileDirectory!: string;
    audienceTags!: string[];
    status!: boolean;
    created!: string;
    modified!: string;
    playbackTime!: string

    setAdditionalKey(): void {  // 
    }

}
