import { getAuthToken } from "@/tmsui";
import { redirect } from "next/navigation";

interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export async function RequireAuth({ 
  children, 
  redirectTo = "/admin" 
}: RequireAuthProps) {
  const token = await getAuthToken("tms_token");

  if (!token) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
