export const LangTrainingList = {
  header: {
    title: "トレーニングプログラム", // Training Program
    addNewTraining: "新しいトレーニングを追加", // Add New Training
  },
  filter: {
    status: "ステータス", // Status
    search: "検索", // Search
    searchPlaceholder: "トレーニング名または説明で検索...", // Search by training name or description
  },
  list: {
    training: "トレーニング", // Training
    registered: "登録済み", // Registered
    completion: "完了", // Completion
    incomplete: "未完了", // Incomplete
    status: "ステータス", // Status
    actions: "操作", // Actions
  },
  form: {
    title: "新規トレーニング追加", // New training added
    trainingName: "トレーニング名", //Training Name
    trainNamePlaceholder: "トレーニング名を入力", // Enter the training name
    explanation: "説明", // explanation
    explanationPlaceholder: "トレーニングの説明を入力", // Enter a description of the training
    selectVideo: "動画を選択", // Select a video
    selectVideoPlaceholder: "",
    selectUser: "ユーザーを選択（任意）", // Select a user (optional)
    selectUserPlaceholder: "",
    selectGroup: "ユーザーグループを選択（任意", //Select a user group (optional)
    selectGroupPlaceholder: "",
    deadline: "期限", //Deadline
    deadlinePlaceholder: "",
    tags: "タグ", //Tags
    tagsPlaceholder: "",
    status: "ステータス", // status
    statusPlaceholder: "",
    cancel: "キャンセル", //cancel
    createATraining: "トレーニングを作成", //Create a training
  },
};

export type ILangTrainingList = typeof LangTrainingList;
