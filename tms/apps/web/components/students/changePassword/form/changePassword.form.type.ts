import { zodInfer, zodObject, zodPasswordRequired, zodStringRequired } from "@/tmsui";

// Schema for changing password with custom validation for matching passwords
export const changePasswordSchema = zodObject({
    oldPassword: zodStringRequired(),
    newPassword: zodPasswordRequired(),
    confirmPassword: zodStringRequired(),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match",
        });
    }
});

export type ChangePasswordType = zodInfer<typeof changePasswordSchema>;

export const changePasswordDefault: ChangePasswordType = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

// Improved password strength checker
export function getPasswordStrength(password: string) {
    if (!password || password.length === 0) {
        return { strength: "empty", message: "" };
    }

    // Criteria checks
    const lengthOK = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    // Strong: all criteria met
    if (lengthOK && hasUpper && hasLower && hasNumber && hasSpecial) {
        return { strength: "strong", message: "Strong password" };
    }

    // Medium: at least 3 of 4 character types and length >= 8
    const typesCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (lengthOK && typesCount >= 3) {
        if (!hasUpper) return { strength: "medium", message: "Add an uppercase letter" };
        if (!hasLower) return { strength: "medium", message: "Add a lowercase letter" };
        if (!hasNumber) return { strength: "medium", message: "Add a number" };
        if (!hasSpecial) return { strength: "medium", message: "Add a special character" };
        return { strength: "medium", message: "Medium strength password" };
    }

    // Weak: not enough length or types
    if (!lengthOK) return { strength: "弱い", message: "Too short (min 8 characters)" };
    if (!hasUpper) return { strength: "弱い", message: "Add an uppercase letter" };
    if (!hasLower) return { strength: "弱い", message: "Add a lowercase letter" };
    if (!hasNumber) return { strength: "弱い", message: "Add a number" };
    if (!hasSpecial) return { strength: "弱い", message: "Add a special character" };

    return { strength: "弱い", message: "Weak password" };
}