import { BASE_URL } from "./baseUrl";
// const TEST_CREATION_API_ENPOINT = "test-creation";
const TEST_CREATION_API_END_POINT = "tests";
export const TEST_CREATION_LIST = {
  LIST: `${BASE_URL}${TEST_CREATION_API_END_POINT}`,
  CREATE: `${BASE_URL}${TEST_CREATION_API_END_POINT}`,
  FIND_BY_ID: (id: string) => `${BASE_URL}${TEST_CREATION_API_END_POINT}/${id}`,
  UPDATE: (id: string) => `${BASE_URL}${TEST_CREATION_API_END_POINT}/${id}`,
  DELETE: (id: string) => `${BASE_URL}${TEST_CREATION_API_END_POINT}/${id}`,
};
