"use client"
import dynamic from "next/dynamic";
const ChangePasswordController = dynamic(() => import("@/components/changePassword/changePassword.controller"), {
    ssr: false,
});

export default function ChangePasswordPage() {
    return (
        <ChangePasswordController />
    )
}
