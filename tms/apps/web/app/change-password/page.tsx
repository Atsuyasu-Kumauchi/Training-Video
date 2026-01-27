import StudentChangePasswordController from "@/components/students/changePassword/changePassword.controller";
import { decodeJwtEdge, getAuthToken } from "@/tmsui";

export default async function ChangePasswordPage() {
    const cookie = await getAuthToken("tms_token");
    const user = await decodeJwtEdge<{ username: string }>(cookie || "");
    return (
        <StudentChangePasswordController username={user?.username || ""} />
    )
}
