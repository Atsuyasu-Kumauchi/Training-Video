import { BASE_URL } from "./baseUrl";
const VIDEO_LIST_API_ENPOINT = "video-list";
export const VIDEO_LIST = {
    LIST: `${BASE_URL}${VIDEO_LIST_API_ENPOINT}`,
    CREATE: `${BASE_URL}${VIDEO_LIST_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${VIDEO_LIST_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${VIDEO_LIST_API_ENPOINT}/${id}`,
};
