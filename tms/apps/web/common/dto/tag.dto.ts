import { BaseDto, IBaseDto } from "./base.dto";

export interface ITagDto extends IBaseDto {
    tagId: string;
    name: string;
    status: string
}


export class CTagDto extends BaseDto implements ITagDto {
    tagId: string = "";
    name: string = "";
    status: string = "";

    setAdditionalKey(): void {
    }

}
