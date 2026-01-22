import { BaseDto, IBaseDto } from "./base.dto";

export interface ITestCreationDto extends IBaseDto {
  testId: number;
  name: string;
  description: string;
  status: string;
  testQuestions: ITestQuestionsDto[];
}

export class CTestCreationDto extends BaseDto implements ITestCreationDto {
  testId: number = 0;
  name: string = "";
  description: string = "";
  status: string = "";
  testQuestions: CTestQuestionDto[] = [];

  setAdditionalKey(): void {
    //
  }
}

export interface ITestQuestionsDto extends IBaseDto {
  question: string;
  options: any[];
}

export class CTestQuestionDto extends BaseDto implements ITestQuestionsDto {
  question: string = "";
  options: any[] = [];

  setAdditionalKey(): void {
    //
  }
}
