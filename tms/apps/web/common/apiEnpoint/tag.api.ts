import { BASE_URL } from "./baseUrl";
const TAG_API_ENPOINT = "tag";
export const TAG = {
    LIST: `${BASE_URL}${TAG_API_ENPOINT}`,
    CREATE: `${BASE_URL}${TAG_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${TAG_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${TAG_API_ENPOINT}/${id}`,
};
