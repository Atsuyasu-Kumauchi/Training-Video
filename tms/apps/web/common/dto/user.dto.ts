import { BaseDto, IBaseDto } from "./base.dto";

export interface IUserDto extends IBaseDto {
    email: string;
    full_name: string;
    department: string;
    assigned_training: number;
    completed_training: number;
    status: string
}


export class CUserDto extends BaseDto implements IUserDto {
    email: string = "";
    full_name: string = "";
    department: string = "";
    assigned_training: number = 0;
    completed_training: number = 0;
    status: string = "";

    setAdditionalKey(): void {  // 
    }

}
