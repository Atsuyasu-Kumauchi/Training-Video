import { BASE_URL } from "./baseUrl";
const DEPARTMENT_API_ENDPOINT = "departments";
export const DEPARTMENT = {
    LIST: `${BASE_URL}${DEPARTMENT_API_ENDPOINT}`,
    CREATE: `${BASE_URL}${DEPARTMENT_API_ENDPOINT}`,
    UPDATE: (id: number) => `${BASE_URL}${DEPARTMENT_API_ENDPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${DEPARTMENT_API_ENDPOINT}/${id}`,
};
