import { BASE_URL } from "./baseUrl";
const ROLE_API_ENPOINT = "role";
export const ROLE = {
    LIST: `${BASE_URL}${ROLE_API_ENPOINT}`,
    CREATE: `${BASE_URL}${ROLE_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${ROLE_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${ROLE_API_ENPOINT}/${id}`,
};
