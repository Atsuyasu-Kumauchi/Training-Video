import { BaseDto, IBaseDto } from "./base.dto";

export interface ITestCreationDto extends IBaseDto {
    test: string;
    category: string
    status: string
}


export class CTestCreationDto extends BaseDto implements ITestCreationDto {
    test: string = "";
    category: string = "";
    status: string = "";

    setAdditionalKey(): void {  // 
    }

}
