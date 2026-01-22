import TotpQrComponent from "@/components/auth/totpQr/totpQr.component";
import { decodeJwtEdge } from "@/tmsui/core/server/jwt-edge";
import { getAuthToken } from "@/tmsui/core/server/server-cookie";

export default async function TotpQrPage() {
    const cookie = await getAuthToken("tms_token");
    const user = await decodeJwtEdge<{ isAdmin: boolean, resetPwd: boolean, username: string }>(cookie || "");
    return (
        <TotpQrComponent isAdmin={user?.isAdmin} resetPwd={user?.resetPwd} username={user?.username || ""} />
    )
}
