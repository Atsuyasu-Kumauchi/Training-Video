import { BASE_URL } from "./baseUrl";
const VIDEO_LIST_API_END_POINT = "videos";
export const VIDEO_LIST = {
    LIST: `${BASE_URL}${VIDEO_LIST_API_END_POINT}`,
    CREATE: `${BASE_URL}${VIDEO_LIST_API_END_POINT}`,
    UPDATE: (id: string) => `${BASE_URL}${VIDEO_LIST_API_END_POINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${VIDEO_LIST_API_END_POINT}/${id}`,
};
