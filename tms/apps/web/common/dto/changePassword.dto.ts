import { BaseDto, IBaseDto } from "./base.dto";

export interface IChangePasswordDto extends IBaseDto {
    old_password: string;
    new_password: string;
    confirm_password: string;
}


export class CChangePasswordDto extends BaseDto implements IChangePasswordDto {
    old_password: string = "";
    new_password: string = "";
    confirm_password: string = "";

    setAdditionalKey(): void {  // 
    }

}
