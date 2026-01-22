import { BaseDto, IBaseDto } from "./base.dto";

export interface IRoleDto extends IBaseDto {
    roleId: number;
    name: string;
    status: boolean;
}


export class CRoleDto extends BaseDto implements IRoleDto {
    roleId: number = 0;
    name: string = "";
    status: boolean = true;

    setAdditionalKey(): void {  // 
    }

}
