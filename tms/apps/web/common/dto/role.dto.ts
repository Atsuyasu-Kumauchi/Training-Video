import { BaseDto, IBaseDto } from "./base.dto";

export interface IRoleDto extends IBaseDto {
    role_name: string;
    status: string;
}


export class CRoleDto extends BaseDto implements IRoleDto {
    role_name: string = "";
    status: string = "";

    setAdditionalKey(): void {  // 
    }

}
