export const LangUser = {
  header: {
    title: "ユーザー", // User
    csvImport: "CSVインポート", // CSV Import
    csvExport: "CSVエクスポート", // CSV Export
    addNewUser: "新規ユーザー追加", // Add New User
  },

  filter: {
    clearFilters: "クリア", // Clear Filters
    status: "ステータス", // Status
    department: "部署", // Department
    search: "検索", // Search
    searchPlaceholder: "名前またはメールで検索...", // Search by name or email
    all_status: "すべてのステータス", // all status
    active: "アクティブ", // active
    inactive: "非アクティブ", // inactive
  },
  list: {
    user: "ユーザー", // User
    email: "メール", // Email
    department: "部署", // Department
    assignedTraining: "割り当てられたトレーニング", // Assigned Training
    completedTraining: "完了したトレーニング", // Completed Training
    status: "ステータス", // Status
    actions: "アクション", // Actions
    userDetail: "ユーザー詳細", // User Details
  },
  view: {
    email: "メール", // Email
    employeeID: "従業員 ID", // Employee ID
    department: "部署", // Department
    startDate: "入社日", // Start date
    role: "役割", // role
    tag: "タグ", // tag
    status: "ステータス", // status
    adminisPrivileges: "管理権限", // Administrative privileges
    tProgress: "トレーニング進捗", // Training Progress
    assignTraining: "割り当て済みトレーニング", // Assigned Training
    completeTraining: "完了済みトレーニング", // Completed Training
    close: "閉じる", // close
  },
  detailsView: {
    returnToUserList: "ユーザーリストに戻る", // Return to User List
  },

  form: {
    addUser: "新規ユーザー追加", //Add a new user
    editUser: "ユーザーを編集", //Edit user
    lastName: "姓", //Last name *
    givenName: "名", //given name *
    email: "メール", //Email
    employeeId: "従業員ID", //Employee ID
    department: "部門", //Department
    departmentPlaceholder: "部門を選択", //Select a department
    role: "役割", //role
    rolePlaceholder: "役割を選択", //Select a role
    dateOfHire: "入社日", //Date of hire
    tag: "タグ", //tag
    issueReview: "課題レビューハイアラキー", //Issue Review Hierarchy
    firstReview: "一次レビュー担当者（直属マネージャー）", //First Reviewer (Direct Manager) *
    secondaryReview: "二次レビュー担当者（シニアマネージャー）", //Secondary Reviewer (Senior Manager) *
    finalReview: "最終レビュー担当者（エンパワー部門）", //Final Reviewer (Empowerment Division) *
    adminisPrivileges: "管理権限", //Administrative privileges
    adminisPrivilegesFooter: "管理権限を選択（任意）", //Select administrative permissions (optional)
    passSetting: "パスワード設定（管理者）", //Password settings (administrator)
    passSettingPlaceholder: "新しいパスワードを入力", //Enter your new password
    passSettingFooter:
      "空欄のままにすると、ユーザーが自分でパスワードを設定できます", //If left blank, users can set their own password.
    generatePassword: "生成", //Generate Password
    cancel: "キャンセル", // Cancel
    addAUser: "ユーザーを追加", //Add a user
    updateUser: "ユーザーを更新", //Update user
  },
};

export type ILangUser = typeof LangUser;
