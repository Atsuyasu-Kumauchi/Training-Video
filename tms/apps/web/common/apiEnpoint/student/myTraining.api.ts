import { BASE_URL } from "../baseUrl";
const MY_TRAINING_API_END_POINT = "trainings";
export const MY_TRAINING_LIST = {
    LIST: `${BASE_URL}${MY_TRAINING_API_END_POINT}`,
    CREATE: `${BASE_URL}${MY_TRAINING_API_END_POINT}`,
    UPDATE: (id: string) => `${BASE_URL}${MY_TRAINING_API_END_POINT}/${id}`,
    FIND_BY_ID: (id: string) => `${BASE_URL}${MY_TRAINING_API_END_POINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${MY_TRAINING_API_END_POINT}/${id}`,
};
