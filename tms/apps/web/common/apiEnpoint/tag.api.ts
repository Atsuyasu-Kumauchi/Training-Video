import { BASE_URL } from "./baseUrl";
const TAG_API_END_POINT = "tags";
export const TAG = {
    LIST: `${BASE_URL}${TAG_API_END_POINT}`,
    CREATE: `${BASE_URL}${TAG_API_END_POINT}`,
    UPDATE: (id: string) => `${BASE_URL}${TAG_API_END_POINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${TAG_API_END_POINT}/${id}`,
};
