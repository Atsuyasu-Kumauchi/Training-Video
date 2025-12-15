import { BaseDto, IBaseDto } from "./base.dto";

export interface IDepartmentDto extends IBaseDto {
    departmentId: number;
    name: string;
    status: boolean;
}


export class CDepartmentDto extends BaseDto implements IDepartmentDto {
    departmentId: number = 0;
    name: string = "";
    status: boolean = true;

    setAdditionalKey(): void {  // 
    }

}
