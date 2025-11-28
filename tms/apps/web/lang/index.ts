import { ILangDashboard, LangDashboard } from "./dashboard";
import { ILangMenu, LangMenu } from "./menu";


export type LangModule = {
    [key: string]: string | number | boolean | undefined;
}

export type ILang = {
    menu: ILangMenu;
    dashboard: ILangDashboard;
}

export const Lang: ILang = {
    menu: LangMenu,
    dashboard: LangDashboard,
}


export type TLangModuleType = (module: typeof Lang) => LangModule;


export const useLang = () => {
    return Lang;
}

export default useLang;


