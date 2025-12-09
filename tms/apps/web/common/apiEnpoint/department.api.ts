import { BASE_URL } from "./baseUrl";
const DEPARTMENT_API_ENPOINT = "departments";
export const DEPARTMENT = {
    LIST: `${BASE_URL}${DEPARTMENT_API_ENPOINT}`,
    CREATE: `${BASE_URL}${DEPARTMENT_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${DEPARTMENT_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${DEPARTMENT_API_ENPOINT}/${id}`,
};
