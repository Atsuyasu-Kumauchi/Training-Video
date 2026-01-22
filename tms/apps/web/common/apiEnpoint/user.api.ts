import { BASE_URL } from "./baseUrl";
const USERS_API_END_POINT = "users";
export const USERS = {
    LIST: `${BASE_URL}${USERS_API_END_POINT}`,
    CREATE: `${BASE_URL}${USERS_API_END_POINT}`,
    UPDATE: (id: string) => `${BASE_URL}${USERS_API_END_POINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${USERS_API_END_POINT}/${id}`,
    USER_REVIEW: `${BASE_URL}${USERS_API_END_POINT}/reviewers`,
};
