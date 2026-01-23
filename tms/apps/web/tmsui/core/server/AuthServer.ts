import axios from "axios";
import { getAuthToken } from "./server-cookie";


export const AuthServer = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000 * 60,
    headers: {
        "Content-Type": "application/json",
    },
});


AuthServer.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken("tms_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        console.log("request error", error);
        return Promise.reject(error);
    }
);

// AuthServer.interceptors.response.use((response) => {
//     return response;
// }, async (error) => {
//     console.log("response error", error);
//     const token = await getAuthToken("tms_token");
//     const payload = token ? decodeJwtClient<{ exp: number }>(token)?.exp : null;
//     if (payload && payload < Date.now() / 1000) {
//         await deleteAuthToken("tms_token");
//     }
//     return Promise.reject(error);
// })

// AuthServer.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (!axios.isCancel(error)) {
//           const status = error.response?.status;
//           const message = error.response?.data?.message || error.message;

//           if (status === 401) {
//             // clearAllCache();
//             // Swal.fire("Unauthorized", "Please log in again.", "warning");
//             setTimeout(() => {
//               window.location.href = String(process.env.NEXT_PUBLIC_WEB_URL);
//             }, 2000);
//           } else if (status === 403) {
//             // Swal.fire(
//             //   "Forbidden",
//             //   "You do not have access to this resource.",
//             //   "error",
//             // );
//           } else if (status === 500) {
//             // Swal.fire(
//             //   "Server Error",
//             //   message ?? "Something went wrong on the server.",
//             //   "error",
//             // );
//           } else {
//             // Swal.fire("Error", message ?? "Unknown error", "error");
//           }
//         }
//         return Promise.reject(error);
//     },
// );


export const MediaServer = (path: string | "") => {
    return process.env.BASE_URL + path
}