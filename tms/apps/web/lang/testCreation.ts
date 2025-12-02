export const LangTestCreation = {
  header: {
    title: "テスト作成", //Test Creation
    createNewTest: "新規テスト作成", //Creating a new test
  },
  filter: {
    status: "ステータス", // Status
    search: "検索", // Search
    searchPlaceholder: "テスト名で検索...", //Search by test name...
  },
  list: {
    test: "テスト", //test
    category: "カテゴリ", //category
    status: "ステータス", //status
    action: "アクション", //action
  },
  form: {
    title: "新規テスト追加", //Add new test
    subTitle: "質問と設定を含む新しいテストを作成", //Create a new test with questions and settings
    testInformation: "テスト情報", //Test Information
    testName: "テスト名 *", //Test Name *
    testNamePlaceholder: "テスト名を入力", //Enter the test name
    category: "カテゴリ *", //Category *
    categoryPlaceholder: "", //
    explanation: "説明", //explanation
    explanationPlaceholder: "テストの説明を入力", //Enter a description for the test
    status: "ステータス", //status *
    questionHeader: "質問", //question
    questionNo: "質問 1", //Question 1
    questionPlaceholder: "ここに質問を入力", //Enter your question here
    question: "質問文", //Question
    questionType: "質問タイプ *", //Question Type *
    correctAnswer: "正解", //correct answer
    answerPlaceholder: "正解を入力", //Enter the correct answer
    cancel: "キャンセル", //cancel
    createATest: "", //
  },
};

export type ILangTestCreation = typeof LangTestCreation;
