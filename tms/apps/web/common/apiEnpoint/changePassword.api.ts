import { BASE_URL } from "./baseUrl";
const CHANGE_PASSWORD_API_ENPOINT = "change-password";      
export const CHANGE_PASSWORD = {
    LIST: `${BASE_URL}${CHANGE_PASSWORD_API_ENPOINT}`,
    CREATE: `${BASE_URL}${CHANGE_PASSWORD_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${CHANGE_PASSWORD_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${CHANGE_PASSWORD_API_ENPOINT}/${id}`,
};
