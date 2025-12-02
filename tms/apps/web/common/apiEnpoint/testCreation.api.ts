import { BASE_URL } from "./baseUrl";
const TEST_CREATION_API_ENPOINT = "test-creation";
export const TEST_CREATION_LIST = {
    LIST: `${BASE_URL}${TEST_CREATION_API_ENPOINT}`,
    CREATE: `${BASE_URL}${TEST_CREATION_API_ENPOINT}`,
    UPDATE: (id: string) => `${BASE_URL}${TEST_CREATION_API_ENPOINT}/${id}`,
    DELETE: (id: string) => `${BASE_URL}${TEST_CREATION_API_ENPOINT}/${id}`,
};
