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
    fileResponse: {
        fileName: string;
        playbackUrl: string;
    };
    videoDuration: number;
    thumbnailUrl: string;
}


export class CVideoListDto extends BaseDto implements IVideoListDto {
    videoId: number = 0;
    name: string = "";
    description: string = "";
    testId: number = 0;
    assignmentId: number = 0;
    uploadType: 'youtube' | 'file' = "file";
    videoUrl: string = "";
    fileName: string = "";
    fileDirectory: string = "";
    audienceTags: string[] = [];
    status: boolean = true;
    created: string = "";
    modified: string = "";
    playbackTime: string = "";
    fileResponse: {
        fileName: string;
        playbackUrl: string;
    } = {
            fileName: "",
            playbackUrl: "",
        };

    videoDuration: number = 0;
    thumbnailUrl: string = "";

    setAdditionalKey(): void {  // 
        this.fileResponse.playbackUrl = this.videoUrl;
        this.fileResponse.fileName = this.fileName;
    }

}
