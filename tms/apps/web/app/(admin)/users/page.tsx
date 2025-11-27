"use client"
import dynamic from "next/dynamic";
const UserController = dynamic(() => import("@/components/userList/user.controller"), {
    ssr: false,
});

export default function UserPage() {
    return (
        <UserController />
    )
}
