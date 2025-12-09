import { BASE_URL } from "./baseUrl";
const ASSIGNMENT_REVIEW_API_ENPOINT = "assignment-review";
export const ASSIGNMENT_REVIEW = {
    LIST: `${BASE_URL}${ASSIGNMENT_REVIEW_API_ENPOINT}`,
    CREATE: `${BASE_URL}${ASSIGNMENT_REVIEW_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${ASSIGNMENT_REVIEW_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${ASSIGNMENT_REVIEW_API_ENPOINT}/${id}`,
};
