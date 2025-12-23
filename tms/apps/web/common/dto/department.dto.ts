import { BaseDto, IBaseDto } from "./base.dto";

export interface IDepartmentDto extends IBaseDto {
    name: string;
    status: string;
}


export class CDepartmentDto extends BaseDto implements IDepartmentDto {
    name: string = "";
    status: string = "";

    setAdditionalKey(): void {  // 
    }

}
