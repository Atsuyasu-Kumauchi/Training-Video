import { ILangAssignmentReview, LangAssignmentReview } from "./assignmentReview";
import { ILangAuth, LangAuth } from "./auth";
import { ILangChangePassword, LangChangePassword } from "./changePassword";
import { ILangDashboard, LangDashboard } from "./dashboard";
import { ILangDepartment, LangDepartment } from "./department";
import { ILangListOfIssues, LangListOfIssues } from "./listOfIssues";
import { ILangMenu, LangMenu } from "./menu";
import { ILangRole, LangRole } from "./role";
import { ILangStudent, LangStudent } from "./students";
import { ILangTag, LangTag } from "./tag";
import { ILangTestCreation, LangTestCreation } from "./testCreation";
import { ILangTrainingList, LangTrainingList } from "./trainingList";
import { ILangUser, LangUser } from "./user";
import { ILangVideoList, LangVideoList } from "./videoList";

export type LangModule = {
    [key: string]: string | number | boolean | undefined;
}

export type ILang = {
    menu: ILangMenu;
    dashboard: ILangDashboard;
    user: ILangUser;
    tag: ILangTag;
    videoList: ILangVideoList;
    trainingList: ILangTrainingList;
    testCreation: ILangTestCreation;
    listOfIssues: ILangListOfIssues;
    assignmentReview: ILangAssignmentReview;
    department: ILangDepartment;
    role: ILangRole;
    changePassword: ILangChangePassword;
    student: ILangStudent;
    auth: ILangAuth;
}

export const Lang: ILang = {
    menu: LangMenu,
    dashboard: LangDashboard,
    user: LangUser,
    tag: LangTag,
    videoList: LangVideoList,
    trainingList: LangTrainingList,
    testCreation: LangTestCreation,
    listOfIssues: LangListOfIssues,
    assignmentReview: LangAssignmentReview,
    department: LangDepartment,
    role: LangRole,
    changePassword: LangChangePassword,
    student: LangStudent,
    auth: LangAuth,
}


export type TLangModuleType = (module: typeof Lang) => LangModule;


export const useLang = () => {
    return Lang;
}

export default useLang;
