const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "/";
export const BASE_URL = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;