import { BASE_URL } from "./baseUrl";
const POSTS_API_ENPOINT = "users";
export const POSTS = {
    LIST: `${BASE_URL}${POSTS_API_ENPOINT}`,
    CREATE: `${BASE_URL}${POSTS_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${POSTS_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${POSTS_API_ENPOINT}/${id}`,
};
