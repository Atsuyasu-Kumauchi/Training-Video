import { zodInfer, zodObject, zodPasswordRequired, zodStringRequired } from "@/tmsui";

// Schema for changing password with custom validation for matching passwords
export const changePasswordSchema = zodObject({
    password: zodStringRequired(),
    newpassword: zodPasswordRequired(),
    confirmPassword: zodStringRequired(),
}).superRefine((data, ctx) => {
    if (data.newpassword !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match",
        });
    }
});

export type ChangePasswordType = zodInfer<typeof changePasswordSchema>;

export const changePasswordDefault: ChangePasswordType = {
    password: "",
    newpassword: "",
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
        return { strength: "strong", message: "強いパスワード" };
    }

    // Medium: at least 3 of 4 character types and length >= 8
    const typesCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (lengthOK && typesCount >= 3) {
        if (!hasUpper) return { strength: "medium", message: "大文字を含む必要があります" };
        if (!hasLower) return { strength: "medium", message: "小文字を含む必要があります" };
        if (!hasNumber) return { strength: "medium", message: "数字を含む必要があります" };
        if (!hasSpecial) return { strength: "medium", message: "特殊文字を含む必要があります" };
        return { strength: "medium", message: "中程度の強さのパスワード" };
    }

    // Weak: not enough length or types
    if (!lengthOK) return { strength: "weak", message: "短すぎます (最小8文字)" };
    if (!hasUpper) return { strength: "weak", message: "大文字を含む必要があります" };
    if (!hasLower) return { strength: "weak", message: "小文字を含む必要があります" };
    if (!hasNumber) return { strength: "weak", message: "数字を含む必要があります" };
    if (!hasSpecial) return { strength: "weak", message: "特殊文字を含む必要があります" };

    return { strength: "weak", message: "弱いパスワード" };
}