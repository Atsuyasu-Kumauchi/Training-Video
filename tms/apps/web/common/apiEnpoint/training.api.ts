import { BASE_URL } from "./baseUrl";
const TRAINING_API_ENPOINT = "trainings";
export const TRAINING_LIST = {
    LIST: `${BASE_URL}${TRAINING_API_ENPOINT}`,
    CREATE: `${BASE_URL}${TRAINING_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${TRAINING_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${TRAINING_API_ENPOINT}/${id}`,
};
