"use server";

import { cookies } from "next/headers";

interface ISetAuthToken {
  name: string;
  value: string;
}

export async function setAuthToken({ name, value }: ISetAuthToken) {
  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    // secure: false,
    // sameSite: "lax",
    path: "/",
  });
}

export async function getAuthToken(name: string) {
  return (await cookies()).get(name)?.value;
}

export async function deleteAuthToken(name: string) {
  (await cookies()).delete(name);
}


