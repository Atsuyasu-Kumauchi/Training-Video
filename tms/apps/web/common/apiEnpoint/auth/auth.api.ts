import { BASE_URL } from "../baseUrl";
const AUTH_API_END_POINT = "auth";
export const AUTH = {
    LOGIN: `${BASE_URL}${AUTH_API_END_POINT}/login`,
    LOGIN_TOTP: `${BASE_URL}${AUTH_API_END_POINT}/login-totp`,
    TOTP_QR: `${BASE_URL}${AUTH_API_END_POINT}/totp-qr`,
    INIT_RECOVERY: `${BASE_URL}${AUTH_API_END_POINT}/init-recovery`, // forgot password
    RESET_PASSWORD: `${BASE_URL}${AUTH_API_END_POINT}/reset-password`, // reset password
    
    CHANGE_PASSWORD: `${BASE_URL}${AUTH_API_END_POINT}/change-password`,
};
