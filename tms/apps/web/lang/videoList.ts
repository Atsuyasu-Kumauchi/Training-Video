export const LangVideoList = {
  header: {
    title: "動画", // Videos
    addNewVideo: " 新規動画追加", // Add New Video
  },
  filter: {
    status: "ステータス", //status
    category: "カテゴリ", //category
    search: "検索", //search
    searchPlaceholder: "タイトルまたは説明で検索...", //Search by title or description...
  },
  list: {
    video: "動画", // Video
    audienceTags: "タグ", // Category
    playbackTime: "再生時間", // Playback Time
    uploadDate: "アップロード日", // Upload Date
    status: "ステータス", // Status
    actions: "アクション", // Actions
  },
  form: {
    title: "新規動画追加", // New videos added
    videoTitle: "動画タイトル", //Video Title
    explanation: "説明", // explanation
    audienceTags: "タグ", // tags
    status: "ステータス", // status
    problemSetTitle: "問題セット", //Problem Set
    problemSetOne: "問題セット 1 (0-3分)", //Problem Set 1 (0-3 minutes)
    problemSetTwo: "問題セット 2 (3-6分)", //Problem Set 2 (3-6 minutes)
    problemSetThree: "問題セット 3 (6-9分)", //Problem Set 3 (6-9 minutes)
    problemSetFour: "問題セット 4 (9-12分)", //Problem Set 4 (9-12 minutes)
    problemSetFooter:
      "問題セットは動画の長さに応じて動的に表示されます（30分 = 10問題セット）", //Problem sets are dynamically displayed based on the video length (30 minutes = 10 problem sets)
    assignment: "課題", // assignment
    uploadTitle: "アップロード方法", //How to upload
    upVfile: "動画ファイルをアップロード（S3）", // Upload video file (S3)
    upVTitle: "動画ファイルをアップロード", //Upload a video file
    upVSubTitle: "動画ファイルを選択 *", //Select a video file *
    upVFileUploaderTitle: "対応形式: MP4, AVI, MOV, WMV（最大500MB）", //Supported formats: MP4, AVI, MOV, WMV (up to 500MB)
    fileInformation: "ファイル情報", //File information
    name: "名前", //Name
    size: "サイズ", //Size
    type: "種類", //Type
    upYoutube: "YouTube動画リンク", // YouTube video link
    upYoutubeTitle: "YouTube動画", // YouTube videos
    upYoutubeSubTitle: "", // YouTube URL
    upYoutubeFooter: "有効なYouTube動画URLを入力", // Enter a valid YouTube video URL
    videoPreview: "動画プレビュー", //
    addVideo: " 動画を追加", // Add a Video
    updateVideo: "動画を更新", // Update Video
    cancle: "キャンセル", // Cancel
  },
};

export type ILangVideoList = typeof LangVideoList;
