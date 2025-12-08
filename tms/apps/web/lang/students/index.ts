import {
  ILangStudentChangePassword,
  LangStudentChangePassword,
} from "./changPassword";
import { ILangStudentDashboard, LangStudentDashboard } from "./dashboard";
import { ILangStudentMyTraining, LangStudentMyTraining } from "./myTraining";
import { ILangStudentResult, LangStudentResult } from "./result";
export type LangStudentModule = {
  [key: string]: string | number | boolean | undefined;
};

export type ILangStudent = {
  dashboard: ILangStudentDashboard;
  myTraining: ILangStudentMyTraining;
  result: ILangStudentResult;
  changePassword: ILangStudentChangePassword;
};

export const LangStudent: ILangStudent = {
  dashboard: LangStudentDashboard,
  myTraining: LangStudentMyTraining,
  result: LangStudentResult,
  changePassword: LangStudentChangePassword,
};

export type TLangStudentModuleType = (
  module: typeof LangStudent
) => LangStudentModule;

export const useStudentLang = () => {
  return LangStudent;
};

export default useStudentLang;
