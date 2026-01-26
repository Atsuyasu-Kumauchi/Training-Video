export const LangListOfIssues = {
  header: {
    title: "課題", //assignment
    description: "学生の課題を管理・レビュー", // Manage and review student assignments
    addNewAssignment: "新しい課題を追加", //add new assignment
  },
  filter: {},
  list: {
    name: "名前", //name
    question: "質問", //question
    actions: "操作", //actions
  },
  form: {
    title: "新規課題追加", //Add new assignment
    editTitle: "割り当てを編集", //Add new assignment
    name: "名前", //name
    namePlaceholder: "名前を入力してください", // name placeholder
    question: "質問", //question
    questionPlaceholder: "課題の質問を入力", //Enter your assignment question
    cancel: "キャンセル", //cancel
    subBtn: "課題を追加", // Add an assignment
    updateBtn: "更新", //update
  },
};

export type ILangListOfIssues = typeof LangListOfIssues;
