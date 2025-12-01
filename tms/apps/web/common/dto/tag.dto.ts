import { BaseDto, IBaseDto } from "./base.dto";

export interface ITagDto extends IBaseDto {
    tag: string;
    status: string
    creation_date: string
}


export class CTagDto extends BaseDto implements ITagDto {
    tag: string = "";
    status: string = "";
    creation_date: string = "";

    setAdditionalKey(): void {  // 
    }

}
