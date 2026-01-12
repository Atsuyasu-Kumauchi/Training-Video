import { BaseDto, IBaseDto } from "./base.dto";

export interface ITestCreationDto extends IBaseDto {
  testId: number;
  name: string;
  description: string;
  status: string;
}

export class CTestCreationDto extends BaseDto implements ITestCreationDto {
  testId: number = 0;
  name: string = "";
  description: string = "";
  status: string = "";

  setAdditionalKey(): void {
    //
  }
}
