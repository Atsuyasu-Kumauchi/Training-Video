import { BaseDto, IBaseDto } from "./base.dto";

export interface IVideoListDto extends IBaseDto {
    title: string;
    category: string;
    playback_time: string;
    status: string
    upload_date: string
}


export class CVideoListDto extends BaseDto implements IVideoListDto {
    title: string = "";
    category: string = "";
    playback_time: string = "";
    status: string = "";
    upload_date: string = "";

    setAdditionalKey(): void {  // 
    }

}
