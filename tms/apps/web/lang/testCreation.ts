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
    editTitle: "テストを編集", //Edit a Test
    subTitle: "質問と設定を含む新しいテストを作成", //Create a new test with questions and settings
    editsubTitle: "テストの詳細と質問を変更", //Change test details and questions
    testInformation: "テスト情報", //Test Information
    testName: "テスト名", //Test Name *
    testNamePlaceholder: "テスト名を入力", //Enter the test name
    category: "カテゴリ *", //Category *
    categoryPlaceholder: "", //
    explanation: "説明", //explanation
    explanationPlaceholder: "テストの説明を入力", //Enter a description for the test
    status: "ステータス", //status *
    statusPlaceholder: "ステータスを選択", //Select a status

    questionHeader: "質問", //question
    addQuestion: "質問を追加", //Add a question
    questionNo: "質問", //Question
    question: "質問文", //Question
    questionPlaceholder: "質問文を入力", //Enter your question
    questionType: "質問タイプ *", //Question Type *
    questionTypePlaceholder: "質問タイプを選択", //Select a question type
    choices: "選択肢", //Choices
    option: " 選択肢 ", //Option

    cancel: "キャンセル", //cancel
    createATest: "テストを作成", //create a test
    updateTest: "テストを更新", //update a test
  },
};

export type ILangTestCreation = typeof LangTestCreation;
