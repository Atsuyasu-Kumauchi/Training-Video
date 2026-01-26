import { BASE_URL } from "./baseUrl";
const ASSIGNMENT_LIST_API_END_POINT = "assignments"; // List of issue
export const ASSIGNMENT_LIST = {
    LIST: `${BASE_URL}${ASSIGNMENT_LIST_API_END_POINT}`,
    CREATE: `${BASE_URL}${ASSIGNMENT_LIST_API_END_POINT}`,
    UPDATE: (id: number) => `${BASE_URL}${ASSIGNMENT_LIST_API_END_POINT}/${id}`,
    DELETE: (id: number) => `${BASE_URL}${ASSIGNMENT_LIST_API_END_POINT}/${id}`,
    REVIEWERS: `${BASE_URL}${ASSIGNMENT_LIST_API_END_POINT}/getReviewers`,
};
