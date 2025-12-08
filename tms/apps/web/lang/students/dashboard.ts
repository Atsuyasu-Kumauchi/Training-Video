export const LangStudentDashboard = {
  header: {
    title: "ダッシュボード", //Dashboard
  },
  filter: {
    sessions: "総トレーニング数", // Total training sessions
    completion: "完了", //completion
    progress: "進行中", //in progress
  },
  list: {
    notification: "通知", //notification
    activity: "最新のアクティビティを確認", //Check the latest activity
    training_assigned: "新しいトレーニングが割り当てられました", //New training assigned
    training_assigned_desc:
      "新しいトレーニングが割り当てられました: 高度なJavaScriptの概念", //New training assigned: "Advanced JavaScript Concepts"
    training_complete: "トレーニング完了", //Training complete
    training_complete_desc:
      "おめでとうございます！「JavaScript基礎」を92%のスコアで完了しました", //Congratulations! You completed JavaScript Fundamentals with a score of 92%
    hours_age: "2時間前", //2 hours ago
    days_age: "1日前", //1 day ago
  },
};

export type ILangStudentDashboard = typeof LangStudentDashboard;
