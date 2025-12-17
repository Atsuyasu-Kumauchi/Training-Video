// utils/jwt-edge.ts


export async function decodeJwtEdge<T>(token: string): Promise<T | null> {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(
        Buffer.from(payload, "base64url").toString()
      );
      return decoded as T;
    } catch {
      return null;
    }
  }
  

  // utils/jwt-client.ts
export function decodeJwtClient<T>(token: string): T | null {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(
        decodeURIComponent(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );
      return decoded as T;
    } catch {
      return null;
    }
}
  