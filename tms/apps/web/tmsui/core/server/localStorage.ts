import Cookies from "js-cookie";

export const setAuthTokens = (name: string, value: string): void => {
    Cookies.set(name, value);
};

export const getAuthTokens = () => {
    return Cookies.get('tms_token');
};   

export const removeAuthTokens = () => {
    Cookies.remove('tms_token');
};

