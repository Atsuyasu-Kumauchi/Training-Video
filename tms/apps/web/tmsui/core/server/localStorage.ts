import Cookies from "js-cookie";

export const setAuthTokens = (name: string, value: string): void => {
    Cookies.set(name, value);
};

export const getAuthTokens = (): { accessToken: string } | null => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        return { accessToken };
    }
    return null;
};   

export const removeAuthTokens = (): void => {
    Cookies.remove('accessToken');
};

export const parseAuthTokens = (): { accessToken: string } | null => {
    const accessToken = getAuthTokens();
    if (accessToken) {
        return parseJwt(accessToken.accessToken);
    }
    return null;
};
// export const setAuthTokens = (accessToken: string): void => {
//     if (typeof window !== "undefined") {
//         window.localStorage.setItem("accessToken", accessToken);
//     }
// };


// export const getAuthTokens = (): string | null => {
//     if (typeof window !== 'undefined') {
//         return window.localStorage.getItem('accessToken');
//     }
//     return null;
// };

// export const removeAuthTokens = (): void => {
//     if (typeof window !== 'undefined') {
//         window.localStorage.removeItem('accessToken');
//     }
// };

// export const parseAuthTokens = (): { accessToken: string } | null => {
//     const accessToken = getAuthTokens();
//     if (accessToken) {
//         return parseJwt(accessToken);
//     }
//     return null;
// };

function parseJwt(token: string) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}