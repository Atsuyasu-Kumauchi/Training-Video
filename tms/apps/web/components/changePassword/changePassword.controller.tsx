"use client"
import ChangePasswordFormComponent from "./form/changePassword.form.component";

export default function ChangePasswordController({ username }: { username: string }) {
    return (
        <ChangePasswordFormComponent username={username} />
    )
}
