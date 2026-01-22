import { BASE_URL } from "./baseUrl";
const ROLE_API_END_POINT = "roles";
export const ROLE = {
    LIST: `${BASE_URL}${ROLE_API_END_POINT}`,
    CREATE: `${BASE_URL}${ROLE_API_END_POINT}`,
    UPDATE: (id: string) => `${BASE_URL}${ROLE_API_END_POINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${ROLE_API_END_POINT}/${id}`,
};
