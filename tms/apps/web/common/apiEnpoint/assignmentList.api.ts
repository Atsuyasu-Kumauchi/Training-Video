import { BASE_URL } from "./baseUrl";
const ASSIGNMENT_LIST_API_ENPOINT = "assignment-list";
export const ASSIGNMENT_LIST = {
    LIST: `${BASE_URL}${ASSIGNMENT_LIST_API_ENPOINT}`,
    CREATE: `${BASE_URL}${ASSIGNMENT_LIST_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${ASSIGNMENT_LIST_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${ASSIGNMENT_LIST_API_ENPOINT}/${id}`,
};
