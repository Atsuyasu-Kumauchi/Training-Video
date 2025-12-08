export const LangStudentChangePassword = {
  header: {
    title: "パスワード変更", //Change Password
  },
  form: {
    title: "パスワード設定", //Password Settings
    sub_title: "現在のパスワードを入力し、新しいパスワードを選択してください", //Enter your current password and choose a new password
    currentPassword: "現在のパスワード", //Current Password
    currentPasswordPlaceholder: "現在のパスワードを入力", //Enter your current password
    newPassword: "新しいパスワード", //New Password
    newPasswordPlaceholder: "新しいパスワードを入力", //Enter your new password
    confirmPassword: "新しいパスワード（確認）", //New password (confirm)
    confirmPasswordPlaceholder: "新しいパスワードを確認", //Confirm New Password
    message: " パスワードが一致している必要があります", //Password must match
    changePassword: "パスワード変更", //Change Password
  },
};

export type ILangStudentChangePassword = typeof LangStudentChangePassword;
